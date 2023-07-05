import React, { useEffect, useRef, useState } from "react";
import { StyledAudio } from "./AudioPlayerElements";

type AudioPlayerProps = {
  src: string;
  localURL?: string;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, localURL }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [blobUrl, setBlobUrl] = useState<string>("");

  useEffect(() => {
    console.count("use Audio");
    if (!localURL && audioRef.current) {
      const audioContext = new AudioContext();
      const decodedData = atob(src);
      const buffer = new ArrayBuffer(decodedData.length);
      const view = new Uint8Array(buffer);

      for (let i = 0; i < decodedData.length; i++) {
        view[i] = decodedData.charCodeAt(i);
      }

      audioContext.decodeAudioData(
        buffer,
        (audioBuffer: AudioBuffer) => {
          const blob = new Blob([buffer], { type: "audio/mpeg" });
          const url = URL.createObjectURL(blob);
          setBlobUrl(url);

          const sourceNode = audioContext.createBufferSource();
          sourceNode.buffer = audioBuffer;
          sourceNode.connect(audioContext.destination);
          sourceNode.start();
        },
        (error: DOMException) => {
          console.log("Error decoding audio data:", error);
        }
      );
    }
  }, [src]);

  return (
    <StyledAudio ref={audioRef} controls>
      <source src={localURL ? localURL : blobUrl} />
    </StyledAudio>
  );
};

export default AudioPlayer;

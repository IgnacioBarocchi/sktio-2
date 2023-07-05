// @ts-ignore
import { ReactMic } from "react-mic";
import styled, { ThemeContext } from "styled-components";
import { useContext } from "react";

const StyledReactMic = styled(ReactMic).attrs(
  (props: { record?: boolean }) => ({
    record: props.record,
    width: 100,
    height: 50,
  })
)`
  display: ${({ record }) => (record ? "block" : "none")};
`;

// @ts-ignore
const SoundVisualizer = ({ onStop, onData, isRecording }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <StyledReactMic
      record={isRecording}
      visualSetting="frequencyBars"
      className="sound-wave"
      onStop={onStop}
      onData={onData}
      strokeColor={themeContext.color.primary}
      backgroundColor={themeContext.background.primary}
    />
  );
};

export default SoundVisualizer;

export const playSoundWithDelay = (soundPath: string, delay: number) => {
  setTimeout(async () => {
    const audio = new Audio(soundPath);
    audio.src = soundPath;
    audio.load();
    await audio.play();
  }, delay);
};

import styled from "styled-components";
import UI from "../../../constants/UI";

export const StyledAudio = styled.audio`
  background: ${({ theme }) => theme.background.primary};
  outline: none;

  &::-webkit-media-controls-panel {
    border: none;
    outline: none;
    background: ${({ theme }) => theme.background.primary};
  }

  &::-webkit-media-controls-mute-button {
    display: none;
  }

  &::-webkit-media-controls-play-button {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-timeline-container {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
    stroke-color: red;
  }

  &::-webkit-media-controls-current-time-display {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-time-remaining-display {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-timeline {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-volume-slider-container {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-volume-slider {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-seek-back-button {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-seek-forward-button {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-fullscreen-button {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-rewind-button {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-return-to-realtime-button {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-toggle-closed-captions-button {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  /* Progress bar */
  &::-webkit-media-controls-panel-progress-bar {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  /* Volume slider */
  &::-webkit-media-controls-volume-slider {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
    display: none;
  }

  /* Play and pause button */
  &::-webkit-media-controls-play-button {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  &::-webkit-media-controls-pause-button {
    border: none;
    outline: none;
    filter: invert(
      ${({ theme }) =>
        theme.background.primary === UI.themes.dark.background.primary ? 1 : 0}
    );
  }

  /* Custom play and pause button */
  &::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    margin-right: 8px;
    vertical-align: middle;
    background-color: purple;
  }

  &[data-playing="true"]::before {
    border-width: 0 0 0 16px;
    margin-right: 12px;
    background-color: purple;
  }

  /* Custom progress bar */
  &::after {
    content: "";
    display: block;
    height: 3px;
    width: 0%;
    transition: width 0.2s ease-out;
    background-color: purple;
  }

  &[data-playing="true"]::after {
    width: 100%;
    background-color: purple;
  }
`;

import styled from "styled-components";

export const Container = styled.footer`
  position: fixed;
  width: -webkit-fill-available;
  height: calc(4vh);
  display: grid;
  grid-template-columns: 0.4fr 2fr 0.6fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: "emoji-area input-message-area input-media-area";
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  @media (max-width: 1024px) {
    width: 90%;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr 1.5fr 1fr;
  }

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: 0.2fr 2fr 0.8fr;
  }
`;

export const EmojiButtom = styled.button`
  grid-area: emoji-area;
  width: 100%;
  color: ${({ theme }) => theme.color.primary};
  background: ${({ theme }) => theme.background.primary};
  border: none;
  outline: none;
  cursor: pointer;
`;

export const emojiRegexExp =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;

import styled, { css } from "styled-components";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import { MediumText, SmallText } from "../../UI/Text";
import AudioPlayer from "../AudioPlayer";
const currentTime = new Date().toLocaleTimeString([], { timeStyle: "short" });

interface BubbleProps {
  isLeft: boolean;
  message: string;
  messageType: "text" | "audio" | "image";
  renderTail?: boolean;
  userColor?: string;
}

const renderTailIn = (isLeft: boolean) => css`
  -webkit-mask: radial-gradient(
        var(--t) at ${isLeft ? "0%" : "100%"} 0,
        #0000 98%,
        #000 102%
      )
      ${isLeft ? "0%" : "100%"} 100% / calc(100% - var(--r)) var(--t) no-repeat,
    conic-gradient(at var(--r) var(--r), #000 75%, #0000 0) calc(var(--r) / -2)
      calc(var(--r) / -2) padding-box,
    radial-gradient(50% 50%, #000 98%, #0000 101%) 0 0 / var(--r) var(--r) space
      padding-box;
`;

const renderTailOut = () => css`
  -webkit-mask-image: linear-gradient(
    linear,
    left 90%,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
`;

const animateTail = false;

export const Bubble = styled.div<BubbleProps>`
  --r: 25px; /* bubble radius*/
  --t: 30px; /* the size of the tail */

  padding: calc(2 * var(--r) / 3);
  -ms-word-break: break-all;
  word-break: break-all;
  /* Non standard for webkit */
  word-break: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;

  ${(props) =>
    props.renderTail &&
    (animateTail
      ? css`
          @keyframes fate-out {
            0% {
              ${renderTailIn(props.isLeft)}
            }

            100% {
              ${renderTailOut()}
            }
          }
          animation: fate-out 0.5s ease-in-out forwards;
        `
      : renderTailIn(props.isLeft))};

  ${({ theme, userColor }) => {
    if (!userColor)
      return css`
        background: linear-gradient(
            135deg,
            ${theme.background.secondary},
            ${theme.background.primary}
          )
          border-box;
      `;

    return css`
      background: linear-gradient(
          135deg,
          ${userColor},
          ${theme.background.secondary},
          ${theme.background.primary}
        )
        border-box;
      background-position: 100% 100%;

      background-size: 300% 300%;
      animation: gradient 4s ease;
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 100% 100%;
        }
      }
    `;
  }}

  border-radius: 20px; /* Adjust the value as per your preference */
  color: ${({ theme }) => theme.color.primary};
  ${(props) =>
    props.isLeft
      ? `
    border-left: var(--t) solid #0000;
    margin-right: var(--t);
  `
      : `
    border-right: var(--t) solid #0000;
    margin-left: var(--t);
  `};
`;

const MessageContainer = styled.div<{ isLeft: boolean }>`
  display: grid;
  max-width: 700px;
  ${(props) =>
    props.isLeft
      ? `
  place-self: start;
`
      : `
  place-self: end;
`}
`;

const A = styled(FlexBoxWithSpacing).attrs((props: { isLeft: boolean }) => ({
  isLeft: props.isLeft,
}))`
  /* background: green; */
  ${(props) =>
    props.isLeft
      ? `
  place-self: start;
`
      : `
  place-self: end;
`}
`;

/*
  ${(props) => getGridFrom(props)};
*/

export const TextMessage = ({
  isSent,
  color,
  id,
  message,
}: {
  isSent?: boolean;
  color: string;
  id: string | null;
  message: string;
}) => {
  return (
    <MessageContainer isLeft={!isSent}>
      {id && (
        <A gap={8} isLeft={!isSent}>
          <MediumText
            color={color}
            className="username"
            style={{ gridArea: "username" }}
            weight="bold"
          >
            {id}
          </MediumText>

          <SmallText
            textType="accent"
            className="timestamp"
            style={{ gridArea: "timestamp" }}
            weight="bold"
          >
            {currentTime}
          </SmallText>
        </A>
      )}
      <Bubble
        isLeft={!isSent}
        message={message as string}
        messageType="text"
        renderTail={message.length > 3}
        userColor={color}
      >
        <MediumText className="message" style={{ gridArea: "message" }}>
          {message}
        </MediumText>
      </Bubble>
    </MessageContainer>
  );
};

const Image = styled.img`
  width: 200px;
`;

export const ImageMessage = ({
  src,
  isSent,
  username,
}: {
  src: string;
  isSent?: boolean;
  username: string;
}) => {
  return (
    <Bubble
      isLeft={isSent as boolean}
      messageType="image"
      message=""
      renderTail
    >
      <SmallText className="username" style={{ gridArea: "username" }}>
        {username}
      </SmallText>
      <Image src={src} />
      <SmallText
        textType="accent"
        className="timestamp"
        style={{ gridArea: "timestamp" }}
      >
        {currentTime}
      </SmallText>
    </Bubble>
  );
};

export const AudioMessage = ({
  isSent,
  src,
  localURL,
}: {
  isSent: boolean;
  src: string;
  localURL?: string;
}) => {
  return (
    <Bubble isLeft={isSent} messageType="audio" message="">
      <SmallText className="username" style={{ gridArea: "username" }}>
        "user"
      </SmallText>
      <AudioPlayer src={src} localURL={localURL} />
      <SmallText
        textType="accent"
        className="timestamp"
        style={{ gridArea: "timestamp" }}
      >
        {currentTime}
      </SmallText>
    </Bubble>
  );
};

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px solid ${(props) => props.color};
  margin: 8px 0;
`;

// @ts-ignore
export const SystemMessage = ({ color, id, message }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <MediumText>
        <span style={{ color }}>{`${id} ${message}`}</span>
      </MediumText>
      <HorizontalLine color={color} />
    </div>
  );
};

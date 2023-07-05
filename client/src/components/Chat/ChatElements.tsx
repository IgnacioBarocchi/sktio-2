import { SmallText } from "../UI/Text";
import { ReactNode, RefObject } from "react";
import styled from "styled-components";
import { Ol } from "../UI/Ol";
import UI from "../../constants/UI";

// the wrapper of messages
export const Messages = styled(Ol).attrs(
  (props: { isSmallDevice: boolean }) => ({
    isSmallDevice: props.isSmallDevice,
  })
)`
  // !chore 100 - (4vh el borde redondo de la esquina) - (4vh el nav del aside) - (8px de extra padding de user area)
  height: calc(92vh - 8px);
  padding-top: 2rem;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-right-radius: 2vh;
  display: grid;
  // place-content: center;
  gap: 20px;
  font-size: 20px;
  background: ${({ theme }) => theme.background.secondary};
  margin-right: ${({ isSmallDevice }) =>
    !isSmallDevice ? `${UI.dimensions.map.get("desktop-aside")}px` : ""};
`;

const ObserverContainer = styled.li<{ ref: any }>`
  width: 100%;
`;

const ObservedContainer = styled.div`
  display: grid;
  // place-content: center;
  gap: 20px;
  // background-color: yellow;
`;

interface ObservedToScrollContainerProps {
  scrollRef: RefObject<HTMLDivElement>;
  observe: (element: any) => void | boolean | RefObject<HTMLDivElement>;
  children: ReactNode;
}
export const ObservedToScrollContainer = ({
  scrollRef,
  observe,
  children,
}: ObservedToScrollContainerProps) => {
  return (
    <ObserverContainer ref={scrollRef}>
      <ObservedContainer ref={observe as unknown as RefObject<HTMLDivElement>}>
        {children}
      </ObservedContainer>
    </ObserverContainer>
  );
};

const SeparatorContainter = styled.div`
  display: flex;
  width: 10%;
  margin: 0 auto;
`;

const Hr = styled.hr<{ color: string }>`
  width: 50%;
  border: 0.2px solid ${({ color }) => color};
  opacity: 0.5;
`;

export const UserNameSeparator = ({ color }: { color: string }) => {
  return (
    <SeparatorContainter>
      {/* <Hr color={color} /> */}
      <SmallText color={color}>user</SmallText>
      {/* <Hr color={color} /> */}
    </SeparatorContainter>
  );
};

// export const UserArea = styled.div`
//   position: relative;
//   grid-area: user-area;
//   width: 50%;
//   padding-right: 0.5rem;
//   display: flex;
//   justify-content: space-evenly;
//   align-items: center;
// `;

// export const EmojiButtom = styled.button`
//   font-size: 45px;
//   background: transparent;
//   color: ${({ theme }) => theme.color.primary};
//   border: none;
//   outline: none;
//   cursor: pointer;
// `;

// export const emojiRegexExp =
//   /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;

// EmojiStyle,
// SkinTones,
// Theme,
// Categories,
// Emoji,
// SuggestionMode,
// SkinTonePickerLocation,

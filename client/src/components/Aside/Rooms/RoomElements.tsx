import React, { useContext, useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import styled from "styled-components";
import { FlexBoxWithSpacing } from "../../UI/Spacing";
import { MediumText } from "../../UI/Text";
import { ThemeContext } from "styled-components";
import { Ol } from "../../UI/Ol/";

export const RoomsContainer = styled(Ol).attrs(
  (props: { isSmallDevice: boolean }) => ({
    isSmallDevice: props.isSmallDevice,
    as: "ul",
  })
)`
  height: 100vh;
  width: 100%;
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;

  padding-bottom: 70px;
`;

export const RoomItem = styled.li`
  // chore, add to map
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.lowContrast};
  border-left-radius: 5px;
  border-top-radius: 5px;
  border-radius: 5px;
  &:hover {
    background: ${({ theme }) => theme.background.tertiary};
  }
  transition-duration: none !important;
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
`;

export const StyledMarquee = styled(Marquee)`
  margin-left: 18px;
  align-self: flex-start;
  font-size: 18px;
  color: ${({ theme }) => theme.color.primary};
  font-weight: 800;
`;

const TopicContainer = styled.div`
  /* margin icons */
  width: 90%; /*calc(100% - 30px);*/
  overflow: hidden;
  white-space: nowrap;
  transition-duration: none !important;
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
`;

const AAA = styled.div`
  position: relative;
`;

const Gradient = styled.div`
  /* width: 100px; */
  /* position: absolute; */
  background: ${({ theme }) =>
    "linear-gradient(to left," + "red" + ", transparent)"};
  background: orange;
`;

export const RoomTopic = ({
  children,
  isHovered,
}: {
  children: React.ReactNode | JSX.Element;
  isHovered: boolean;
}) => {
  const [isNotVisible, setIsNotVisible] = useState(true);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const themeContext = useContext(ThemeContext);

  const hex2rgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return [r, g, b];
  };
  const grd = hex2rgb(themeContext.background.tertiary);
  useEffect(() => {
    // @ts-ignore
    const contentWidth = contentRef?.current?.offsetWidth;
    // @ts-ignore
    const containerWidth = containerRef?.current?.offsetWidth;

    setIsNotVisible(contentWidth <= containerWidth);
  }, []);

  return (
    <TopicContainer>
      {!isNotVisible && isHovered ? (
        <StyledMarquee
          gradientColor={grd}
          //@ts-ignore
          // ref={containerRef}
          gradientWidth="60px"
          delay={0.2}
        >
          <div ref={contentRef}>{children}</div>
        </StyledMarquee>
      ) : (
        <AAA>
          <Gradient />
          <MediumText weight="bold">{children}</MediumText>
        </AAA>
      )}
    </TopicContainer>
  );
};

export const RoomDetails = styled.div`
  display: flex;
  margin-right: 8px;
`;

export const RoomFeatures = styled(FlexBoxWithSpacing)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FeatureLabel = styled.span`
  font-size: 11px;
  color: ${(props) =>
    props.color ? props.color : props.theme.color.secondary};
  font-weight: 700;
`;

export const FeatureValue = styled.span`
  font-size: 11px;
  color: ${(props) => (props.color ? props.color : props.theme.color.primary)};
  font-weight: 700;
`;

export const UsersCountContainer = styled.div`
  position: absolute;
  top: -15px;
  right: 15px;
  transition-duration: none !important;
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
`;

export const UsersCount = styled.div<{ isHovered: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.secondary};
  border-top: 1px solid
    ${({ theme, isHovered }) => (isHovered ? "trasparent" : theme.color.accent)};
  background: ${({ theme, isHovered }) =>
    isHovered ? theme.background.tertiary : theme.background.primary};
  transition-duration: none !important;
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
`;

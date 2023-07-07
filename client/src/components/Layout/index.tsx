import React, { ReactNode, RefObject } from "react";
import { Socket } from "socket.io-client";
// @ts-ignore
import { DefaultEventsMap } from "socket.io/dist/typed-events";
// import { useApplicationState } from "../../containers/Context";
import styled from "styled-components";
// import Menu from "../Aside";
import SystemMessage from "../SystemMessage";
import Chat from "../Chat";
import LandingForm from "../Landing";
import AsideMenu from "../Aside/Menu";
import UI from "../../constants/UI";
import { useSktioStore } from "../../store/store";

type LayoutProps = {
  isSmallDevice: boolean;
  children?: ReactNode;
  socket: Socket | Socket<DefaultEventsMap, DefaultEventsMap>;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
  messengerAreaRef: RefObject<HTMLDivElement>;
};

const LayoutContainer = styled.div<LayoutProps>`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: ${({ theme: theme }) => theme.background.primary};
`;

const Main = styled.main`
  height: 100vh;
  width: 100%;
  border-top-left-radius: 2vh;
  /* border-bottom-left-radius: 4vh; */
  background: ${({ theme: theme }) => theme.background.primary};
  position: fixed;
  left: ${UI.dimensions.map.get("desktop-aside")}px;
`;

const Layout: React.FC<LayoutProps> = ({
  isSmallDevice,
  socket,
  setTheme,
  theme,
}) => {
  const { sessionState } = useSktioStore((state) => ({
    sessionState: state.sessionState,
  }));

  return (
    // @ts-ignore
    <LayoutContainer>
      <AsideMenu socket={socket} setTheme={setTheme} theme={theme} />
      {!isSmallDevice && (
        <Main>
          <SystemMessage />
          {sessionState.room ? (
            <Chat socket={socket} />
          ) : (
            <LandingForm isSmallDevice={false} />
          )}
        </Main>
      )}
    </LayoutContainer>
  );
};

export default Layout;
// const {
//   state: { session },
// } = useApplicationState();
/* {session.room ? (
            <Chat socket={socket} />
          ) : (
            <LandingForm isSmallDevice={isSmallDevice} />
          )} */

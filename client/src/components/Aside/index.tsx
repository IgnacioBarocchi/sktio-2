import styled from "styled-components";
import AsideMenu from "./Menu";
import { StyledBackground } from "../UI/Background";
import { Socket } from "socket.io-client";
import { HTMLAttributes } from "react";
import { FCResizable, Resizable } from "../../@types/Resizable";

const FixedMenu = styled(StyledBackground)`
  position: fixed;
  top: 0;
  // background: magenta;
  z-index: 99999999999999;
  width: 100vw !important;
`;

const AsideColumnAttributes: FCResizable = (props: Resizable) => ({
  isSmallDevice: props.isSmallDevice,
  as: "aside",
});

const AsideColumn = styled(FixedMenu).attrs(AsideColumnAttributes)`
  grid-area: aside-column;

  height: 100vh;
  margin: 0;
  padding: 0;
  /*display: grid;*/
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 1.1fr;
  gap: 0px 0px;
  grid-template-areas:
    "top-menu-area"
    "aside-content";

  @media (min-width: 768px) {
    width: 100vw;
  }
`;
// todo
const TopBarMenu = styled(StyledBackground)``;

interface AsideProps {
  socket: Socket;
  setTheme: any;
  theme: any;
}
const Menu = ({ socket, setTheme, theme }: AsideProps) => {
  // const { state: uiVariables } = useApplicationState();
  const renderMenu = () => (
    <AsideMenu
      // isSmallDevice={uiVariables.isSmallDevice}
      socket={socket}
      setTheme={setTheme}
      theme={theme}
    />
  );
  return <AsideColumn>{renderMenu()}</AsideColumn>;
  // todo this
  // return uiVariables.isSmallDevice ? (
  //   <TopBarMenu>{renderMenu()}</TopBarMenu>
  // ) : (
  //   <AsideColumn>{renderMenu()}</AsideColumn>
  // );
};

export default Menu;

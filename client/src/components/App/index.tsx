// @ts-ignore
import GlobalStyle from "../../containers/GlobalStyle/GlobalStyle";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useApplicationState } from "../../containers/Context";
import { ThemeProvider } from "styled-components";
import { URLtoRoom } from "./helper";
import useIcons from "../../assets/icons";
import AppHelmet from "../../containers/AppHelmet";
import Layout from "../Layout";
import WebSocketManager from "../../containers/WebSocketManager";
import UI from "../../constants/UI";
const App = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useIcons();
  return (
    <>
      <AppHelmet />
      <WebSocketManager>
        {(socket?: Socket) => (
          <ThemeProvider theme={UI.themes[theme]}>
            <GlobalStyle />
            <Layout
              // uiVariables.isSmallDevice
              isSmallDevice={false}
              // @ts-ignore
              socket={socket}
              setTheme={setTheme}
              theme={theme}
            />
          </ThemeProvider>
        )}
      </WebSocketManager>
    </>
  );
};

export default App;

// const {
//   state: { uiVariables },
//   dispatch,
// } = useApplicationState();
// useEffect(() => {
//   // !not used URLtoRoom
//   URLtoRoom(dispatch);
//   const handleResize = () => {
//     dispatch({
//       type: "UPDATE_UI_STATE",
//       payload: { isSmallDevice: window.innerWidth < 768 },
//     });
//   };

//   handleResize();
//   window.addEventListener("resize", handleResize);

//   return () => window.removeEventListener("resize", handleResize);
// }, []);

// @ts-ignore
import GlobalStyle from "../../containers/GlobalStyle/GlobalStyle";
import { Socket } from "socket.io-client";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
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

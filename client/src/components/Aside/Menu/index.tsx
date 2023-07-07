import "react-tabs/style/react-tabs.css";
import PrivateRoomForm from "../../RoomForm";
import SystemMessage from "../../SystemMessage";
import LandingForm from "../../Landing";
import Chat from "../../Chat";
import { Nav, JoinRoom, Aside } from "./MenuElements";
import { STab, STabList, STabPanel, STabs } from "../../UI/STabs";
import SessionForm from "../SessionForm";
import Rooms from "../Rooms";
import { useSktioStore } from "../../../store/store";

// @ts-ignore
const AsideMenu = ({ socket, theme, setTheme }) => {
  const { UIState, sessionState } = useSktioStore((state) => ({
    UIState: state.UIState,
    sessionState: state.sessionState,
  }));

  return (
    <Aside isSmallDevice={false}>
      <STabs
        selectedTabClassName="is-selected"
        selectedTabPanelClassName="is-selected"
      >
        <Nav isSmallDevice={false}>
          <STabList>
            <STab tabIndex="1">rooms</STab>
            <STab tabIndex="2">join</STab>
            <STab tabIndex="3">create</STab>
            <STab tabIndex="4">settings</STab>
            {UIState.isSmallDevice && <STab tabIndex="5">chat</STab>}
          </STabList>
        </Nav>
        <STabPanel>
          <Rooms socket={socket} />
        </STabPanel>
        <STabPanel>
          <JoinRoom socket={socket} />
        </STabPanel>
        <STabPanel>
          <PrivateRoomForm />
        </STabPanel>
        <STabPanel>
          <SessionForm theme={theme} setTheme={setTheme} />
        </STabPanel>
        {UIState.isSmallDevice && (
          <STabPanel>
            <SystemMessage />
            {sessionState.room ? (
              <Chat socket={socket} />
            ) : (
              <LandingForm isSmallDevice={UIState.isSmallDevice} />
            )}
          </STabPanel>
        )}
      </STabs>

      {/*
        // todo
        <Footer /> 
      */}
    </Aside>
  );
};

export default AsideMenu;

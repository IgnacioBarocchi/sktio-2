import "react-tabs/style/react-tabs.css";
import PrivateRoomForm from "../../RoomForm";
import SystemMessage from "../../SystemMessage";
import LandingForm from "../../Landing";
import Chat from "../../Chat";
import { Nav, JoinRoom, Aside } from "./MenuElements";
import { STab, STabList, STabPanel, STabs } from "../../UI/STabs";
import { useApplicationState } from "../../../containers/Context";
// import Footer from "../Footer";
import { useState } from "react";
import SessionForm from "../SessionForm";
import Rooms from "../Rooms";

// @ts-ignore
const AsideMenu = ({ socket, theme, setTheme }) => {
  const {
    state: { session, uiVariables },
  } = useApplicationState();
  const [tabIndex, setTabIndex] = useState<number>(uiVariables.selectedTab);

  const animateTabs = (currentIndex: number, targetIndex: number) => {
    const animateTo = (index: number, target: number) => {
      if (index === target) {
        console.log("done");
        return;
      }
      setTimeout(() => {
        animateTo(index + 1, target);
        setTabIndex(index + 1);
      }, 1500);
    };

    if (currentIndex > targetIndex) {
      animateTo(currentIndex - 1, targetIndex);
    } else {
      animateTo(currentIndex + 1, targetIndex);
    }
  };
  return (
    <Aside isSmallDevice={uiVariables.isSmallDevice}>
      <STabs
        // selectedIndex={tabIndex}
        // onSelect={animateTabs}
        selectedTabClassName="is-selected"
        selectedTabPanelClassName="is-selected"
      >
        <Nav isSmallDevice={uiVariables.isSmallDevice}>
          <STabList>
            <STab tabIndex="1">rooms</STab>
            <STab tabIndex="2">join</STab>
            <STab tabIndex="3">create</STab>
            <STab tabIndex="4">settings</STab>
            {uiVariables.isSmallDevice && <STab tabIndex="5">chat</STab>}
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
        {uiVariables.isSmallDevice && (
          <STabPanel>
            <SystemMessage />
            {session.room ? (
              <Chat socket={socket} />
            ) : (
              <LandingForm isSmallDevice={uiVariables.isSmallDevice} />
            )}
          </STabPanel>
        )}
      </STabs>
      {/* <Footer /> */}
    </Aside>
  );
};

export default AsideMenu;
/*
 const changeTabIndex = (
    prevIndex: number,
    targetIndex: number
  ): Promise<void> => {
    return new Promise((resolve) => {
      setTabIndex(prevIndex);
      setTimeout(() => {
        setTabIndex(targetIndex);
        console.log("done");
        resolve();
      }, 1000);
    });
  };

  const onSelect = (index: number) => {
    if (index !== tabIndex) {
      let prevIndex = tabIndex;
      let targetIndex = index;
      if (prevIndex > targetIndex) {
        [prevIndex, targetIndex] = [targetIndex, prevIndex];
      }
      const sequence = Array.from(
        { length: targetIndex - prevIndex },
        (_, i) => prevIndex + i + 1
      );
      const promiseSequence = sequence.reduce(
        (acc, index) => acc.then(() => changeTabIndex(prevIndex, index)),
        Promise.resolve()
      );
      promiseSequence.then(() => changeTabIndex(targetIndex, targetIndex));
    }
  };
*/

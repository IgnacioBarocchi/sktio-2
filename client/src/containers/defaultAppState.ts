const DEFAULT_STATE = {
  session: {
    userId: Math.floor(Math.random() * 1_000)
      .toString()
      .padStart(3, "0"),
    userAlias: "",
    room: "",
    userIsActive: true,
    userColorIndex: Math.floor(Math.random() * 16),
  },
  settings: {
    useHistory: true,
    revealLocation: false,
    useButtons: false,
    aceptMedia: true,
    aceptLinks: true,
    useLocalStorage: false,
    sessionSettingsIsVisible: true,
  },
  uiVariables: {
    headerHeight: 0,
    messengerUserPannelHeight: 0,
    messengerColumnHeight: 0,
    emojiPickerIsVisible: false,
    isSmallDevice: undefined,
    selectedTab: 0,
  },
  messages: [],
  themeColor: "dark",
  systemMessage: "",
  shouldFetch: true,
  publicRooms: [],
};

export default DEFAULT_STATE;

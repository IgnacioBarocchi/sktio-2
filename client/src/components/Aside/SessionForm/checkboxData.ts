export interface CheckboxRecord {
  name: string;
  label: string;
  headerText: string;
  helpText: string;
}

export const checkboxData: CheckboxRecord[] = [
  {
    name: "changeTheme",
    label: "Change Theme",
    headerText: "Do you want to change the color scheme of the website?",
    helpText:
      "A toggle for changing website color mode is important because the default bright white background with black text can be harsh on the eyes, especially during extended use. Dark mode or low-light mode options can help reduce eye strain and improve the overall user experience.",
  },
  {
    name: "aceptMedia",
    label: "Accept Media",
    headerText:
      "Do you want to recieve and accept media contents in your chat?",
    helpText:
      "This feature allows media such as images and audio to be displayed in the chat. This feature may be disabled to conserve bandwidth or for security reasons.",
  },
  {
    name: "aceptLinks",
    label: "Accept Links",
    headerText: "Do you want to recieve external links in your chat?",
    helpText:
      "This feature enables links to be displayed in the chat. For security reasons, links may be disabled by default.",
  },
  {
    name: "useHistory",
    label: "Use History",
    headerText: "Do you want to have your chat history in an active session?",
    helpText:
      "This feature allows you to view past messages in the chat. If disabled, only the most recent message will be displayed and you won't be able to see your own messages.",
  },
  {
    name: "showStatus",
    label: "Show Status",
    headerText: "Do you want to show when you are online?",
    helpText:
      "Show to the others if you are AFK (away from keyboard) or OTK (on the keyboard)",
  },
  {
    name: "revealLocation",
    label: "Show Location",
    headerText: "Do you want to share your locations in public rooms?",
    helpText:
      "This feature allows you to share your approximate location with others in the chat based on your IP address. Please note that this information may not be accurate if you are using a VPN or proxy. Additionally, we do not store this information on any database.",
  },
  {
    name: "useLocalStorage",
    label: "Use Local Storage",
    headerText: "Do you want to save your settings for the further sessions?",
    helpText:
      "Local storage is a way for a website to store data on your computer, similar to cookies, but with a greater capacity and without the data being sent back to the server with every HTTP request. It is a safe way to store data on your device because the app won't store any user data in a server database.",
  },
];

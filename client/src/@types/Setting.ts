export interface UserSettingsState {
  useHistory?: { UIVisible: boolean; value: boolean };
  revealLocation?: { UIVisible: boolean; value: boolean };
  aceptMedia?: { UIVisible: boolean; value: boolean };
  aceptLinks?: { UIVisible: boolean; value: boolean };
  sessionSettingsIsVisible?: { UIVisible: boolean; value: boolean };
}

export type UserSettingsStateRecord = {
  [K in keyof UserSettingsState]: {
    UIVisible: boolean;
    value: boolean;
  };
};

import { Dispatch } from "../../../@types/ApplicationStated";

export const URLtoRoom = (dispatch: Dispatch) => {
  const queryParameters = new URLSearchParams(window.location.search);
  const room = queryParameters.get("type");
  const token = queryParameters.get("token");
  if (room) alert(room + token);
  return dispatch;
};

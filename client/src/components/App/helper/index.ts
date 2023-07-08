export const URLtoRoom = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const room = queryParameters.get("type");
  const token = queryParameters.get("token");
  if (room) console.log(room + token);
};

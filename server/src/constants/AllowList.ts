export const ALLOWED_IPS_MAP = new Map([
  ["OTHER_CLIENT_ADDRESS_CLIENT", "192.168.43.152"],
]);

export const ALLOWED_ORIGINS_MAP = new Map([
  ["REACT_DEFAULT_BACKLOOP", "http://localhost:3000"],
  ["MY_IP_BACKLOOP", "http://192.168.43.153:3000"],
  ["OTHER_CLIENT_ADDRESS_CLIENT", "http://192.168.43.152:3000"],
  ["OTHER_CLIENT_ADDRESS_SERVER", "http://192.168.43.152:8585"],
  ["LOCAL_HOST", "http://localhost:*"],
  ["HOSTED_SECURED_SITE", "https://scchat.netlify.app"],
  ["MY_MASK", "http://255.255.255.0"],
  ["MY_MASK_WITH_PORT", "http://255.255.255.0/3000"],
]);

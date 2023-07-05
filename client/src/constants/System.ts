export enum SystemMessageType {
  LEFT_THE_ROOM = "left the room",
  JOINED_THE_ROOM = "joined the room",
  OTHER = "other",
}

enum Labels {
  LEFT_THE_ROOM = "left the room",
  JOINED_THE_ROOM = "joined the room",
  OTHER = "other",
}

const endpoints = new Map<string, string>();
// closed dev
endpoints.set("dev-backloop-8585", "http://localhost:8585"); //pass
endpoints.set(
  "dev-backloop-8585-external-devices",
  "http://192.168.43.153:8585"
); //pass
endpoints.set(
  "secured-dev-backloop-8585-external-devices",
  "https://192.168.43.153:8585"
); //pass
endpoints.set("secured-dev-backloop-8585", "https://localhost:8585"); //fails
// open dev (const isProd = true;)
endpoints.set("dev-host", "http://84.15.190.191:8585"); //fails (pending)
endpoints.set("secured-dev-host", "https://84.15.190.191:8585"); //fails (pending)

class System {
  private static instance: System;
  private constructor() {}

  public static getInstance(): System {
    if (!System.instance) {
      System.instance = new System();
    }

    return System.instance;
  }

  public get Label(): typeof Labels {
    return Labels;
  }

  public get EndpoinMap(): Map<string, string> {
    return endpoints;
  }
}

export default System;

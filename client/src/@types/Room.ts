import { PrivateRoom, PublicRoom } from "./Room/Room";

export interface RoomsState {
  shouldFetch: boolean;
  publicRooms: PublicRoom[];
  privateRooms: PrivateRoom[];
}

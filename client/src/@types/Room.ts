export interface PublicRoom {
  users: number;
  id: string;
  topic: string;
  acceptMedia: boolean;
  useHistory: boolean;
  acceptLinks: boolean;
}

export interface PrivateRoom extends PublicRoom {
  token: string;
}

export interface RoomsState {
  shouldFetch: boolean;
  publicRooms: PublicRoom[];
  privateRooms: PrivateRoom[];
}

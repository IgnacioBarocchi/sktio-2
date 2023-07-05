export type Message = {
  [x: string]: any;
  fromUserColor: string;
  fromUserId: string;
  text: string | undefined;
  isSent: boolean;
  fromSystem?: boolean;
  fromUserAlias: string;
};

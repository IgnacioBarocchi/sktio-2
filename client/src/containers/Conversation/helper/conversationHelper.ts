import { Message } from "../../../@types/Message";
import { SessionState } from "../../../@types/Session";

/**
Returns the metadata information of a given message including the username and color of the user who sent the message, 
and the metadata of the previousand next messages in the conversation.
@param {Message} message - The message object for which metadata is requested.
@param {number} i - The index of the message object in the messages array.
@param {Message[]} messages - The array of all messages in the conversation.
@param {{ userAlias: string; userId: string; userColor: string }} session - The session object containing user's alias, user ID and user's color.
@returns {{ isPrevSameUser: boolean; isNextSameUser: boolean; username: string|null; color: string; }} Returns an object containing metadata 
information of the message including whether the previous message was sent by the same user, 
whether the next message is sent by the same user, the username of the sender, and the color of the sender.
*/
export const getMessageMetadata = (
  message: Message,
  i: number,
  messages: Message[],
  session: SessionState,
  themeContext: any
) => {
  const {
    fromUserId,
    isSent,
    fromUserAlias,
    fromUserColorIndex /*fromSystem,*/,
  } = message;

  // console.log("fromSystem aaaaa " + fromSystem);
  const { userAlias, userId, userColorIndex } = session;

  const prevMessage = messages[i - 1];

  const nextMessage = messages[i + 1];

  const isPrevSameUser = prevMessage?.fromUserId === fromUserId ?? false;

  const isNextSameUser = nextMessage?.fromUserId === fromUserId ?? false;

  const currentCompleteAlias = `${userAlias} (${userId})`;

  const you = `YOU (${userId})`;

  const otherCompleteAlias = `${fromUserAlias} (${fromUserId})`;

  const color =
    themeContext.userColors[isSent ? userColorIndex : fromUserColorIndex];

  const username = getUsername(
    i,
    isPrevSameUser,
    isSent,
    userAlias,
    currentCompleteAlias,
    you,
    fromUserAlias,
    fromUserId,
    otherCompleteAlias
  );

  return { isPrevSameUser, isNextSameUser, username, color };
};

const getUsername = (
  i: number,
  isPrevSameUser: boolean,
  isSent: boolean,
  userAlias: string | undefined,
  currentCompleteAlias: string,
  you: string,
  fromUserAlias: string,
  fromUserId: string,
  otherCompleteAlias: string
) => {
  if (isPrevSameUser && i > 0) {
    //* If the user is the same user that was sending the previous message, it shouldn't return the username,
    //* hence we know that comes from the user sending messages
    return null;
  }

  if (isSent) {
    if (userAlias) {
      //* If the current message was sent by the current user and the user has an alias,
      //* we show the current user's complete alias
      return currentCompleteAlias;
    } else {
      //* If the current message was sent by the current user but the user does not have an alias,
      //* we show "YOU" followed by the user ID
      return you;
    }
  }

  if (fromUserAlias) {
    //* If the current message was not sent by the current user and the sender has an alias,
    //* we show the sender's complete alias
    return otherCompleteAlias;
  } else {
    //* If the current message was not sent by the current user and the sender does not
    //* have an alias, we show the sender's user ID
    return fromUserId;
  }
};

export const shouldRenderSeparator = (
  isNextSameUser: boolean,
  fromSystem?: boolean
): boolean => {
  const result = !isNextSameUser && !fromSystem;
  return result;
};

export type Side = 'left' | 'right';

export type ChatUser = {
  userId: string;
  name: string;
  avatarUrl: string;
};

export type ChatMessage = {
  id: string;
  userId: string;
  text: string;
  side: Side;
};

export type ApiSendChatMessagePayload = {
  userId: string;
  text: string;
  side: Side;
};

export type ChatRoomEvent = {
  chatMessage: ChatMessage;
};

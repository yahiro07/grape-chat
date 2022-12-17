export type ChatUser = {
  userId: string;
  name: string;
  avatarUrl: string;
};

export type ChatMessage = {
  id: string;
  userId: string;
  text: string;
};

export type ChatMessageView = {
  id: string;
  user: ChatUser;
  text: string;
};

export type ApiSendChatMessagePayload = {
  userId: string;
  text: string;
};

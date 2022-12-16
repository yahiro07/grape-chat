import { ChatUser } from "./types.ts";

function createUserProvider() {
  const presetUsers: ChatUser[] = [
    {
      userId: "user1",
      name: "cat",
      avatarUrl: "/logo.svg",
    },
    {
      userId: "user2",
      name: "dog",
      avatarUrl: "/logo.svg",
    },
  ];
  const fallbackUser: ChatUser = {
    userId: "err",
    name: "err",
    avatarUrl: "err",
  };
  return {
    getAllUsers() {
      return presetUsers;
    },
    getUserById(userId: string) {
      return presetUsers.find((user) => user.userId === userId) || fallbackUser;
    },
  };
}

export const userProvider = createUserProvider();

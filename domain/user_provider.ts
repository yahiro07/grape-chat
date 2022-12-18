import { ChatUser } from "./types.ts";

function createUserProvider() {
  const presetUsers: ChatUser[] = [
    {
      userId: "user1",
      name: "shiro",
      avatarUrl: "/avatar/fp17.jpg",
    },
    {
      userId: "user2",
      name: "koko",
      avatarUrl: "/avatar/fp5.jpg",
    },
    {
      userId: "user3",
      name: "same",
      avatarUrl: "/avatar/fp2.jpg",
    },
    {
      userId: "user4",
      name: "meg",
      avatarUrl: "/avatar/fp20.jpg",
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

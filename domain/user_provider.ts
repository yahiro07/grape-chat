import { ChatUser } from "./types.ts";

function createUserProvider() {
  const presetUsers: ChatUser[] = [
    {
      userId: "user1",
      name: "shiro",
      avatarUrl: "/avatar/fp17.png",
    },
    {
      userId: "user2",
      name: "koko",
      avatarUrl: "/avatar/fp5.png",
    },
    {
      userId: "user3",
      name: "mano",
      avatarUrl: "/avatar/fp2.png",
    },
    {
      userId: "user4",
      name: "meg",
      avatarUrl: "/avatar/fp20.png",
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

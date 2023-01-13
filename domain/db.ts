import {
  MongoClient,
  ObjectId,
} from 'https://deno.land/x/mongo@v0.31.1/mod.ts';
import { config as dotEnvConfig } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';
import { customAlphabet } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts';

type IUserProfile = {
  displayName: string;
};

type IUserEntity = {
  _id: ObjectId;
  userId: string;
  profile: IUserProfile;
};

type ISpeech = {
  text: string;
};

type ITalkEntity = {
  _id: ObjectId;
  talkId: string;
  authorId: string;
  authorProfile: IUserProfile;
  speeches: ISpeech[];
  createdAt: string;
  updatedAt: string;
  starredUserIds: string[];
};

export type ITalkDto = {
  talkId: string;
  authorId: string;
  authorProfile: IUserProfile;
  speeches: ISpeech[];
  createdAt: string;
  updatedAt: string;
  numStars: number;
};

export type IUserDto = {
  userId: string;
  profile: IUserProfile;
};

const nanoidChars =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const generateShortIdForUser = customAlphabet(nanoidChars, 6);
const generateShortIdForTalk = customAlphabet(nanoidChars, 10);

const oldDateStr = new Date(2000, 0, 2).toISOString();

function migrateTalk(source: {
  _id: ObjectId;
  talkId: string;
  authorId?: string;
  authorProfile?: IUserProfile;
  authorUserId?: string;
  authorUserProfile?: IUserProfile;
  speeches: ISpeech[];
  createdAt?: string;
  updatedAt?: string;
  starredUserIds?: string[];
}): ITalkEntity {
  return {
    _id: source._id,
    talkId: source.talkId,
    authorId: source.authorId ?? source.authorUserId!,
    authorProfile: source.authorProfile ?? source.authorUserProfile!,
    speeches: source.speeches,
    createdAt: source.createdAt ?? oldDateStr,
    updatedAt: source.updatedAt ?? source.createdAt ?? oldDateStr,
    starredUserIds: source.starredUserIds ?? [],
  };
}

function mapTalkEntityToDto(it: ITalkEntity): ITalkDto {
  return {
    talkId: it.talkId,
    authorId: it.authorId,
    authorProfile: it.authorProfile,
    speeches: it.speeches,
    createdAt: it.createdAt,
    updatedAt: it.updatedAt,
    numStars: it.starredUserIds.length,
  };
}

export async function createDb(databaseName: string) {
  const configEnv = dotEnvConfig({ path: './.env' });
  const mongoUrl = configEnv.MONGO_URL;

  const client = new MongoClient();
  await client.connect(mongoUrl);

  const database = client.database(databaseName);
  const userCollection = database.collection<IUserEntity>('users');
  const talkCollection = database.collection<ITalkEntity>('talks');

  await userCollection.createIndexes({
    indexes: [{ key: { userId: 1 }, name: 'userId', unique: true }],
  });
  await talkCollection.createIndexes({
    indexes: [{ key: { talkId: 1 }, name: 'talkId', unique: true }],
  });

  async function pullTalkById(talkId: string): Promise<ITalkEntity> {
    const talk = await talkCollection.findOne({ talkId });
    if (!talk) {
      throw 'talk not found';
    }
    return migrateTalk(talk);
  }

  async function pullUserById(userId: string): Promise<IUserEntity> {
    const user = await userCollection.findOne({ userId });
    if (!user) {
      throw 'user not found';
    }
    return user;
  }

  return {
    async clearAllUsers() {
      await userCollection.deleteMany({});
    },
    async createUser(displayName: string): Promise<string> {
      const userId = generateShortIdForUser();
      await userCollection.insertOne({ userId, profile: { displayName } });
      return userId;
    },
    async getUserById(userId: string) {
      return await pullUserById(userId);
    },
    async getAllUsers(): Promise<IUserDto[]> {
      const allUsers = await userCollection.find().toArray();
      return allUsers;
    },
    async setUserProfile(userId: string, profile: IUserProfile) {
      await userCollection.updateOne({ userId }, { $set: { profile } });
    },
    async createTalk(userId: string, speeches: ISpeech[]) {
      const user = await pullUserById(userId);
      const talkId = generateShortIdForTalk();
      const createdAt = new Date().toISOString();
      await talkCollection.insertOne({
        talkId,
        authorId: userId,
        authorProfile: user.profile,
        speeches,
        createdAt,
        updatedAt: createdAt,
        starredUserIds: [],
      });
      return talkId;
    },
    async getTalkById(talkId: string) {
      const talk = await pullTalkById(talkId);
      return mapTalkEntityToDto(talk);
    },
    async getAllTalks(): Promise<ITalkDto[]> {
      const talks = await talkCollection.find().sort({ createdAt: -1 })
        .toArray();
      return talks.map(migrateTalk).map(mapTalkEntityToDto);
    },
    async replaceSpeechesOfTalk(talkId: string, speeches: ISpeech[]) {
      const updatedAt = new Date().toISOString();
      await talkCollection.updateOne({ talkId }, {
        $set: { speeches, updatedAt },
      });
    },
    async getUserTalks(userId: string): Promise<ITalkDto[]> {
      const allTalks = await talkCollection.find({ authorId: userId }).sort(
        { createdAt: -1 },
      )
        .toArray();
      return allTalks.map(migrateTalk).map(mapTalkEntityToDto);
    },
    async addStar(talkId: string, userId: string) {
      await pullUserById(userId);
      const talk = await pullTalkById(talkId);
      if (talk.starredUserIds.includes(userId)) {
        throw 'already starred';
      }
      if (userId === talk.authorId) {
        throw 'cannot apply self star';
      }
      const starredUserIds = [...talk.starredUserIds, userId];
      await talkCollection.updateOne({ talkId }, { $set: { starredUserIds } });
    },
    async removeStar(talkId: string, userId: string) {
      await pullUserById(userId);
      const talk = await pullTalkById(talkId);
      if (!talk.starredUserIds.includes(userId)) {
        throw 'star not found';
      }
      const starredUserIds = talk.starredUserIds.filter((id) => id !== userId);
      await talkCollection.updateOne({ talkId }, { $set: { starredUserIds } });
    },
  };
}

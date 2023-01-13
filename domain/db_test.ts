import {
  assertEquals,
  assertExists,
  assertRejects,
} from 'https://deno.land/std@0.154.0/testing/asserts.ts';
import { createDb, ITalkDto } from './db.ts';

const db = await createDb('test1');

Deno.test('create a user', async () => {
  await db.clearAllUsers();
  const userId = await db.createUser('yamada');
  const user = await db.getUserById(userId);
  assertEquals(user.profile.displayName, 'yamada');
  const allUsers = await db.getAllUsers();
  assertEquals(allUsers.length, 1);
});

Deno.test('create multiple users', async () => {
  await db.clearAllUsers();
  const userId0 = await db.createUser('yamada');
  const userId1 = await db.createUser('tanaka');
  const allUsers = await db.getAllUsers();
  assertEquals(allUsers.length, 2);
  assertEquals(allUsers[0].userId, userId0);
  assertEquals(allUsers[0].profile.displayName, 'yamada');
  assertEquals(allUsers[1].userId, userId1);
  assertEquals(allUsers[1].profile.displayName, 'tanaka');
});

Deno.test('update user name', async () => {
  await db.clearAllUsers();
  const userId = await db.createUser('yamada');
  await db.setUserProfile(userId, { displayName: 'tanaka' });
  const user = await db.getUserById(userId);
  assertEquals(user.profile.displayName, 'tanaka');
});

Deno.test('create talk', async () => {
  await db.clearAllUsers();
  const userId = await db.createUser('yamada');
  const talkId = await db.createTalk(userId, [{ text: 'hello' }, {
    text: 'world',
  }]);
  const talk = await db.getTalkById(talkId);
  assertEquals(talk.authorId, userId);
  assertEquals(talk.authorProfile.displayName, 'yamada');
  assertEquals(talk.speeches, [{ text: 'hello' }, { text: 'world' }]);
  assertExists(talk.createdAt);
  assertExists(talk.updatedAt);
  assertEquals(talk.numStars, 0);
});

Deno.test('update talk speeches', async () => {
  await db.clearAllUsers();
  const userId = await db.createUser('yamada');
  const talkId = await db.createTalk(userId, [{ text: 'hello' }]);
  await db.replaceSpeechesOfTalk(talkId, [{ text: 'world' }]);
  const talk = await db.getTalkById(talkId);
  assertEquals(talk.speeches, [{ text: 'world' }]);
});

Deno.test('get user talks', async () => {
  await db.clearAllUsers();
  const userIdA = await db.createUser('yamada');
  await db.createTalk(userIdA, [{ text: 'hello' }]);
  await db.createTalk(userIdA, [{ text: 'hello' }]);

  const userIdB = await db.createUser('yamada');
  await db.createTalk(userIdB, [{ text: 'hello' }]);

  const talksA = await db.getUserTalks(userIdA);
  assertEquals(talksA.length, 2);
  const talksB = await db.getUserTalks(userIdB);
  assertEquals(talksB.length, 1);
});

Deno.test('add star', async () => {
  await db.clearAllUsers();
  const userIdA = await db.createUser('yamada');
  const talkIdA = await db.createTalk(userIdA, [{ text: 'hello' }]);

  const userIdB = await db.createUser('yamada');

  let talk: ITalkDto;

  assertRejects(() => db.addStar(talkIdA, userIdA), 'cannot apply self star');

  await db.addStar(talkIdA, userIdB);
  talk = await db.getTalkById(talkIdA);
  assertEquals(talk.numStars, 1);

  assertRejects(() => db.addStar(talkIdA, userIdB), 'already starred');

  await db.removeStar(talkIdA, userIdB);
  talk = await db.getTalkById(talkIdA);
  assertEquals(talk.numStars, 0);
});

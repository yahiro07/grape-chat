# Grape Chat

A chat application example built with Deno+Fresh+Resin CSS.

Mainly focusing on demonstrating how the UI constructed with Resin.

It come with unique dual role conversation feature to make a talk by oneself.
There are no login function for easiness. An avatar is selected from preset characters.

## Application

[https://grape-chat.miqsel.net/](https://grape-chat.miqsel.net/)

## Screenshot

![screenshot](https://i.imgur.com/H678e66.png)

## Environment

Up to 10 messages are retained in memory of the server process.
Either server side localStorage or redis are used to preserve messages after restarting the server. To select which persistence storage is used, provide the environment variable below

```
  CHAT_LOG_PERSISTENCE_SCHEME = local_storage (default)
  CHAT_LOG_PERSISTENCE_SCHEME = redis
  CHAT_LOG_PERSISTENCE_SCHEME = none
```

If there are no variables, localStorage is used.

## Debug

```
deno task start
```

## Reference Repositories

[Fresh](https://github.com/denoland/fresh)

[showcase_chat](https://github.com/denoland/showcase_chat)

[Resin CSS](https://github.com/yahiro07/resin)

## License

MIT license.

#DockerFile for Railway

FROM denoland/deno:1.39.3

ARG RAILWAY_GIT_COMMIT_SHA
ENV DENO_DEPLOYMENT_ID=${RAILWAY_GIT_COMMIT_SHA}

ENV CHAT_LOG_PERSISTENCE_SCHEME redis

WORKDIR /app 

USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
#COPY deps.ts .
#RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts
# RUN deno run -A --unstable dev.ts build

# CMD deno run --unstable --allow-net --allow-env --allow-read --allow-write --allow-run main.ts
CMD deno run -A --unstable main.ts

#DockerFile for Railway

FROM denoland/deno:alpine-1.28.3

ARG RAILWAY_GIT_COMMIT_SHA
ENV DENO_DEPLOYMENT_ID=${RAILWAY_GIT_COMMIT_SHA}

WORKDIR /app 

USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
#COPY deps.ts .
#RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
#RUN deno cache main.ts
#RUN deno cache main.ts --import-map=import_map.json

CMD deno run --allow-net --allow-env --allow-read --allow-write --allow-run main.ts
# CMD deno run -A main.ts

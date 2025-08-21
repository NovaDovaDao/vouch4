FROM denoland/deno:2.3.6

# set DENO_DIR to avoid conflicts with google cloud
ENV DENO_DIR=./.deno_cache
ENV NODE_ENV=production

WORKDIR /app

COPY . .
RUN deno install --allow-scripts
RUN deno run -A npm:prisma generate

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

# The port that your application listens to.
ENV PORT=8000
EXPOSE $PORT

# Warmup caches
RUN timeout 10s deno run -A --env --unstable-sloppy-imports main.ts || [ $? -eq 124 ] || exit 1

CMD ["run", "-A", "--env", "--unstable-sloppy-imports", "main.ts"]
# 👉 Dockerfile based on https://pnpm.io/docker#example-2-build-multiple-docker-images-in-a-monorepo.

FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

FROM base AS build

ARG APP_NAME="@stream-me/frontend"

COPY . /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --force --filter=${APP_NAME}
RUN pnpm run --filter=${APP_NAME} build
RUN pnpm deploy --filter=${APP_NAME} --prod=/prod/app

FROM base AS final

COPY --from=build /prod/app /app

EXPOSE 3000
CMD ["pnpm", "start"]

FROM node:14 as contracts

WORKDIR /app/contracts
COPY contracts/package.json ./package.json
COPY contracts/yarn.lock ./yarn.lock
RUN yarn install

COPY contracts ./
# copy env from local context
ADD .env ./
ADD contracts/build/contracts.json /app/contracts/build/contracts.json
RUN mkdir -p /app/frontend
RUN make testnet/extract-contracts

FROM node:14 as frontend

ENV NODE_ENV=production
WORKDIR /app/frontend
COPY frontend/package.json ./package.json

RUN npm install

COPY frontend ./
COPY --from=contracts /app/frontend/.env.production.local ./
COPY --from=contracts /app/frontend/contracts ./contracts
# Add prod config
ADD config/.env.production.local /tmp/.env.production.local
RUN cat /tmp/.env.production.local >> ./.env.production.local
RUN rm -f .env.local .env .env.development.local

RUN npm run build
RUN npm run export

FROM node:14

COPY --from=frontend /app/frontend/out /app/frontend/out

WORKDIR /app/backend

COPY backend/package.json ./package.json
COPY backend/yarn.lock ./yarn.lock
RUN yarn install
COPY backend ./

CMD [ "node", "server" ]
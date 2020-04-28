#!bin/sh

cd ./WebApp/UI
yarn
yarn lint
yarn test:ci
yarn build
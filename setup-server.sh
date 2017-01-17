#!/usr/bin/env bash

set -ex

CI_BRANCH=${TRAVIS_BRANCH:-$CIRCLE_BRANCH}

# Cloning to temp first since since $HOME/api-server already exists
git clone --depth=10 --no-checkout --branch ${CI_BRANCH} git@github.com:edvisor-io/api-server /tmp/api-server/
mv /tmp/api-server/.[!.]* $HOME/api-server/

cd $HOME/api-server/
git checkout $CI_BRANCH
git submodule update --init

if [ $CI_BRANCH == 'master' ]; then
  aws s3 cp s3://edvisor-configs/api.edvisor.io/.env.staging .env
else
  aws s3 cp s3://edvisor-configs/api.edvisor.io/.env.e2e .env
fi

npm install
npm run build >/dev/null 2>&1
NODE_ENV=staging ./bin/edvisor full-reset

# web-client-e2e

## What is this repo?

End-to-end test suites for the Edvisor.io web-client

## Making sense of this repo

The directory structure models that of the web client. Each directory contains
tests for one application, and corresponds to the same named directory in the
web-client repo.

## What you need

In addition to the web-client-e2e, you'll need other repos.

To set up the project from the first clone:

1. Clone api-server and web-client

2. Run `npm install` in both repos.

3. Run `git submodule init`

4. Run `git submodule update`

5. Run `cp .env.sample .env`

To set up the client:

1. Navigate to the web-client repo and run `./bin/edvisor build -s client`.

To set up the server:

1. Navigate to the api-server repo and run `npm install -g gulp`

2. Symlink client directory to the /client folder in api-server

3. Run `gulp build`

4. Reset the database by running `./bin/edvisor full-reset`

5. Run `gulp`

Almost ready to run tests. To get the test tools. You'll need to:

1. Install Protractor globally with `npm install -g protractor`

2. Webdriver-manager will be installed with the above. Now run `Webdriver-manager update`.

3. Navigate to the directory containing the conf.js of your desired test. Run test with `protractor conf.js`.

When there's new code:

1. Navigate to the web-client repo and run `./bin/edvisor build -s client`.

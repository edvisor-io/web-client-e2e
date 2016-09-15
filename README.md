# web-client-e2e

## What is this repo?

End-to-end test suites for the Edvisor.io web-client

## Making sense of this repo

The directory structure models that of the web client. Each directory contains
tests for one application, and corresponds to the same named directory in the
web-client repo.

#### Naming

Here you'll find naming patterns for the variables and prototypal methods we're
using.

We use prototypal methods to do actions on the page. Method names begins with
a verb, followed by the element on the page, and lastly extra detail about the
element. For example, a method for clicking on a button called 'Change' will be
called 'clickButtonChange'. When there are more buttons called 'Change' on the
same page, we'll add contextual detail to the end. If the button changes a
student's pipeline, we'll call it 'clickButtonChangePipeline'.

Initialize variables that correspond to elements on a page follow a similar
pattern.

## What you need

In addition to the web-client-e2e, you'll need other repos.

### To set up the project from the first clone:

1. Clone api-server and web-client

2. Run `npm install` in both repos.

3. Run `git submodule init`

4. Run `git submodule update`

5. Run `cp .env.sample .env`

#### To set up the client:

1. Navigate to the web-client repo and run `./bin/edvisor build -s client`.

#### To set up the server:

1. Navigate to the api-server repo and run `npm install -g gulp`

2. Symlink client directory to the /client folder in api-server

3. Run `gulp build`

4. Reset the database by running `./bin/edvisor full-reset`

5. Run `gulp`

### Almost ready to run tests. To get the test tools. You'll need to:

1. Install Protractor globally with `npm install -g protractor`

2. Webdriver-manager will be installed with the above. Now run `Webdriver-manager update`.

3. Navigate to the directory containing the conf.js of your desired test. Run test with `protractor conf.js`.

## These need to be running when doing tests:

1. Selenium: Run `webdriver-manager start`. Doesn’t matter where from.

2. MariaDB: Run `mysql.server start`

3. Gulp: Run `gulp` from api-server repo.

## When there's new code:

1. Navigate to the web-client repo and run `./bin/edvisor build -s client`.

## Useful Docs

> Protractor styleguide: https://github.com/CarmenPopoviciu/protractor-styleguide

> Protractor debugging: https://github.com/angular/protractor/blob/master/docs/debugging.md

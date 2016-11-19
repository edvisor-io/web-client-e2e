# web-client-e2e

🤖 : *"My name is Trillian! I'll be your guide to Galaxy E2E Alpha!"*

## What is this repo? ⚙

🤖 : *"This repo contains end-to-end test suites for the Edvisor.io web-client"*

## Quickly making sense of this repo ⚡️

The directory structure models that of the web client. Each directory contains
tests for one application, and corresponds to the same named directory in the
web-client repo.

***

## For a quick guide ⚡️ to certain situations, read this section.

For a high level overview of the code, move on to the next section.

### Do this, when there's new code in the web-client 🌱 😎 :

1. If new code is on remote, `git pull` from the web-client repo.

2. Otherwise go straight to api-server repo (remember client is symlinked) and
run `./bin/edvisor build -s client`.

### To interact with the database:

1. `mysql -u root`

2. Update with Stripe token to stop Stripe errors.

### When you want to reset the database:

1. Make sure the database is running. If not, `mysql.server start`.

2. Then go into `.env` in `api-server` repo and make sure database is local.

3. Then reset the database by running `./bin/edvisor full-reset`

***

## Styleguides

An overview of how things are structured

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :rocket: `:rocket:` when improving performance
    * :memo: `:memo:` when writing docs
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

### JavaScript Styleguide

All JavaScript must adhere to [JavaScript Standard Style](http://standardjs.com/).

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Inline `export`s with expressions whenever possible
  ```js
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```

### the `.conf` file: Where it all begins

The `.conf` file helps set the stage for your tests.

#### suites

Suites let you organize your tests. In our tests, those suites that start with
`a` such as `aSettings`, refer to the Settings functionality of the Agency app.
Those that start with `s` such as `sSettings` are for the Settings functionality
of the School app.

### pageObject patterns 👚

🤖 : "*Patterns are beautiful weaves of code*"

If it's for a page, such as the Student Profile page, then the filename will be
`studentProfile.pageObject.js`

If it's for a part of a page, such as an Area/Modal etc, then the filename will
be `addStudentModal.pageObject.js`

Each app or sub-app has a pageObject file of its very own. Only the root
pageObject file `imports` from any other pageObject file that it may need. This
is to minimize the chaos of pageObjects endlessly importing from others. You
can see which pageObjects an app test suite is dependent on by looking at only
the `imports` in the root pageObject file.

### spec file patterns

🤖 : "*Moar patterns* 😍"

The `before()` and `beforeEach` functions contain logic that the tests are
dependent on *but are not being tested*. The logic being tested will always
be inside an `it('should be put in here if being tested')`.

### Naming objects

Here you'll find naming patterns for the variables and prototypal methods we're
using.

🤖 : *"✨ Magical conventions help keep your sanity."*

#### verb + detail about the element + element type

We use prototypal methods to do actions on the page. Method names are:
verb + detail about the element + element type. For example, a method for
clicking on a button called 'Change' will be called `clickChangeButton`.

When there are more buttons called 'Change' on the same page, we'll add
contextual details. If the button changes a student's pipeline, we'll call the
method that clicks it `clickChangePipelineButton()`. If there is more than one
button that  fits this pattern, the order can be included. For example,
`clickChangePipelineFirstButton()`

Initialized variables that correspond to elements on a page follow a similar
pattern. They just omit the leading verb, because they don't "do" things. The
button being clicked in the example above can be initialized as
"changePipelineButton".

Functions prefixed with 'testNeeds' (e.g. `testNeedsDuplicatePipeline`) means
that it isn't meant to represent human behaviour. Rather that it's needed by a
test. So such functions may take shortcuts, such as navigating to a
specific page in the app by url instead of clicking to it as a user is likely to.

(Undergoing changes) The word 'relative' is used in a name when the element is only available in a
given context. For example, 'changePipelineStatusRelativeOption' is an option
that only appears when a dropdown is present.

#### Shared files

`/shared/pages/` contains pageObject files belonging to pages that do not
possess specs files of their own.

Static methods in `widgets.js` interact with the page. pageObject files provide
a layer of abstraction and so spec files don't directly invoke static widget
methods. Instead, spec files may invoke pageObject prototypal methods which
in turn call static widget methods.

#### Filenames

Filenames may make more sense in context of the complete filepath.

### Shell script styleguide

The styleguide linked below is rather good.

[shell style guide](https://google.github.io/styleguide/shell.xml)

***

## Now the fun stuff. What you need to get started 🐣

In addition to the web-client-e2e, you'll need other repos.

### To set up the project from the first clone:

1. Clone api-server and web-client

Then, in both repos:

2. Run `npm install`

3. Run `git submodule init`

4. Run `git submodule update`

5. Copy the sample env into the env with `cp .env.sample .env`

#### To set up the client:

1. Navigate to the web-client repo and run `./bin/edvisor build -s client`.

#### To set up the server:

1. Navigate to the api-server repo and run `npm install -g gulp`

2. Symlink client directory to the /client folder in api-server

3. Run `gulp build`

4. Reset the database by running `./bin/edvisor full-reset`

5. Run `gulp`

Ok, setup is done!

***

## Almost ready to run tests. Get the test tools.

### You'll need Protractor (and maybe Selenium if not using DirectConnect):

1. Install Protractor for the project using `npm install`. This will install all
dependencies for the `web-client-e2e` project.

2. webdriver-manager will be installed with the above. Now run
`./node_modules/protractor/bin/webdriver-manager update`. This is for Selenium.

### "These need to be running when doing tests!" said the 🤖 happily:

1. Are you using DirectConnect or Selenium? If Selenium: Protractor may start a standalone Selenium server.
Otherwise if you have Protractor installed global from before, run `webdriver-manager start`. Doesn’t matter where from. Terminal will stay running. Check that conf.js points to this Selenium server. If DirectConnect, check that directConnect: 'true' in `conf.js`.

2. Are you running it against localhost (is gulp is running from `api-server` directory)? You'll need a database. We use MariaDB. Run `mysql.server start`, one time. Will need to rerun when machine is restarted. FYI, `mysql.server stop` and `mysql.server restart`.

3. Are you running it against on the localhost? If so, run `gulp` from api-server repo. Will keep running in terminal.

### Running the tests

Navigate to the directory containing the conf.js of your desired test. Run test with `protractor protractor.conf.js`.

#### Option A: Running all tests (long)
- `protractor protractor.conf.js` will run all tests.

#### Option B: Running a set/suite of tests (Medium!) (coming soon)
- Options are: invoices, partners, quotes, settings, students - this runs all tests involving each suite
- `protractor protractor.conf.js --suite agency` change 'agency' to whatever app you want to test

#### Option C: Running one specific test (short) (coming soon)
- `protractor protractor.conf.js --specs agency/student_profile_spec.js`

***

## Useful Docs (🆓 stuff to put out and prevent pesky 🔥🔥🔥)

🤖 : *"I've found these pages very very helpful. Maybe you should check them
out.* ✨"

> [Protractor styleguide](https://github.com/CarmenPopoviciu/protractor-styleguide) 🤖 : *"This one has good links at the end of README.md"*

> [Best of Mocha, just read this page to start](https://mochajs.org/)

> [Protractor docs, with search](http://www.protractortest.org/#/api)

> [Protractor debugging](https://github.com/angular/protractor/blob/master/docs/debugging.md)

> [Protractor timeouts](https://github.com/angular/protractor/blob/master/docs/timeouts.md) (many errors from here 💩)

> [Did you know how many ways you'll need to run this for reliable results?](http://stackoverflow.com/questions/30600738/difference-running-protractor-with-without-selenium) This will help 😁

> [Using MariaDB](https://www.digitalocean.com/community/tutorials/how-to-create-and-manage-databases-in-mysql-and-mariadb-on-a-cloud-server)

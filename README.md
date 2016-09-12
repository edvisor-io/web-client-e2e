# end-to-end test suite for the web-client

The directory structure models that of the web client. Each directory contains
tests for one application, and corresponds to the same named directory in the
web-client repo.

## What you need

You'll need to:

1. Install Protractor globally with `npm install -g protractor`

2. Webdriver-manager will be installed with the above. Now run `Webdriver-manager update`.

3. Navigate to the directory containing the conf.js of your desired test. Run test with `protractor conf.js`.

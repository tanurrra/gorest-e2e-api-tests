### E2E API tests for Gorest service

## Task
Create e2e test scenarios for the CRUD user operations with API Version 2 and HTTP Bearer Token authentication from https://gorest.co.in/ service.

What we want to see is:
- How you test APIs
- Good structuring of tests for reusability and maintainability
- Provide clear instructions on how to run the tests in README
- GitHub CI/CD is a plus

## Technology
- [Playwright](https://github.com/microsoft/playwright) as a test framework with TypeScript
- [Allure](https://allurereport.org/docs/playwright/) as test reporter 
- [Github actions](https://playwright.dev/docs/ci-intro) to run tests in CI on push, pull requests. Job is running inside container [Docker.jammy](https://github.com/microsoft/playwright/blob/main/utils/docker/Dockerfile.jammy)

## Tests scenarios
1. Create a new user, get user details, updade user details, delete user
2. Create a new user, create a user post, create a post comment
3. Create a new user, create a todo for user
4. For existing user retrieve post comments
5. For existing user retrieve user todos

## How to run
Make sure you have node.js, npm, npx installed and all the required packages. 

**To install npm packages:**

```npm ci```

**To run tests locally:**

```npx playwright test --reporter=line ```

**To run tests locally with Allure reporter:**

```npx playwright test --reporter=line,allure-playwright ```

**To serve beautiful Allure report in HTML locally:**

```npx allure serve allure-results```

**To run tests on Github:**

Project contains `.github/workflows/playwright.yml` config for running tests in GitHub actions for push and for pull requests on branches [ main, master ]. Test results will be stored in allure-results folder for 30 days. 

**To serve beautiful Allure report after running on Github actions:**

From Github actions -> artifacts:  download `allure-results` folder and run 

```allure serve path_to_downloaded_folder```

### Not included in this solution/can be improved
This is a quick solution for demo purposes 
- Proper instructions for running and installation for all OS; 
- bash script to install all dependencies; 
- Environment configurations to pass to command line/read from config;
- For requests to /posts, /comments, /users etc helper functions can be created; 
- Test data reading from config file or passing by command line instead of hardcoded constants; 
- Auth token should be stored properly; 
- Scripts in package.json to run tests in one word command and so on;
- Test design - scenarios can be improved and extended based on the test strategy;
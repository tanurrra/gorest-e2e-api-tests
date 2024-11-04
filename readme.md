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

## Test scenarios
1. Create a new user (POST /users)
    - Send a POST request to /users with valid data (e.g., name, gender, email, status).
    Expected results: status Code 201. Response body should include the created user’s details (e.g., id, name, email, etc.). 

    Possible scenarios:
    - Try to create user with a duplicate email (should return an error with a duplicate email message).
    - Try to create user with unsupported data types (e.g., integer for name).
    - Test with all fields empty.
2. Get existing users (GET /users/)
    - Find all users (GET request to /users)
    Expected results: status Code 200. The response body should contains list of users
    - Find existing user (GET request to /users/{user_id})
    Expected results: status Code 200. The response body should contain the correct user details (e.g., id, name, email, status).
    - Find non-existing user (GET request to /users/{user_id})
    Expected results: status Code 404.

    Possible scenarios:
    - Try with an invalid user_id format (e.g., alphanumeric).
    - Test with very large user_id numbers.
    - Pagination and filtering
3. Update existing user (PUT /users/{user_id})
    - Send a PUT request to /users/{user_id} with updated fields (e.g., change name, email, or status).
    Expected results: status Code 200. The response body should contain updated user details (e.g., id, name, email, status).

    Possible scenarios:
    - Try with an invalid user_id.
    - Try with an invalid data (if there's field validation)
4. Delete existing user (DELETE /users/{user_id})
    - Send a DELETE request to /users/{user_id} 
    Expected results: status Code 204. 

    Possible scenarios:
    - Try with an invalid user_id.
    - Try to delete same user twice.

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
This is a quick solution, not perfect.
- bash script to install all dependencies; 
- Environment configurations to pass to command line/read from config;
- For requests to GET/POST/DELETE/PUT for /users helper functions can be created; 
- Test data reading from config file or passing by command line instead of hardcoded constants; 
- Auth token should be stored properly (Bearer token had been created specifically for this project and will expire soon); 
- Scripts in package.json to run tests in one word command and so on;
- Test design - scenarios can be improved and extended based on the test strategy;
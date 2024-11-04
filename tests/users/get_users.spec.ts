import { test, expect } from '@playwright/test';

// Load environment variables (e.g., Bearer Token) from .env file or environment
const BEARER_TOKEN = process.env.BEARER_TOKEN || 'cb22b2aef20e5daa2b2bbb7e51ca4195e99987d7bb3e8c6a672b770da59aa642';

// Search user data
const userId = '7502395';
const invalidUserId = 'invalidUserId';
const maxResultsInResponse = 10;

test.describe('Users GET Endpoint', () => {
  test(`should search for users and get list of ${maxResultsInResponse} users is in response`, async ({ request }) => {
    const userResponse = await request.get(`public/v2/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      }
    });
    expect(userResponse).toBeOK();
    const userResponseBody = await userResponse.json();
    // Verify that response is equal to maxResultsInResponse
    expect(userResponseBody.length).toBe(maxResultsInResponse);
    // Optional: Verify the JSON schema
  });

  test(`should search for userId "${userId}" and userId is in response`, async ({ request }) => {
    const userResponse = await request.get(`public/v2/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      }
    });
    expect(userResponse).toBeOK();
    const userResponseBody = await userResponse.json();
    // Verify that response contains userId
    expect(userResponseBody.id, `expected to find user "${userId}"`)
      .toBe(parseInt(userId));
    // Optional: Verify the JSON schema
  });

  test(`should search for an invalid userId "${invalidUserId}" and get empty responce`, async ({ request }) => {
    const userResponse = await request.get(`public/v2/users/${invalidUserId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      }
    });
    expect(userResponse).not.toBeOK;
    expect(userResponse.status()).toBe(404);
    const userResponseBody = await userResponse.json();
    expect(await userResponse.json(),
      `Found ${userResponseBody.length} users for user Id "${invalidUserId}"`)
      .toBeEmpty;
  });

  // Can be some more positive and negative tests 
});

import { test, expect } from '@playwright/test';

// Load environment variables (e.g., Bearer Token) from .env file or environment
const BEARER_TOKEN = process.env.BEARER_TOKEN || 'cb22b2aef20e5daa2b2bbb7e51ca4195e99987d7bb3e8c6a672b770da59aa642';

// POST Create User Data
const userData = {
  name: 'John Doe',
  gender: 'male',
  email: `john.doe.test.${Date.now()}@test.com`, // unique email to avoid duplicates
  status: 'active'
};
let userId: number;

test.describe('Users DELETE Endpoint', () => {
  // Create new user as prerequisite for a test
  test.beforeAll(async ({ request }) => {
    // Step 1: Create new user to use in the update test
    const createUserResponse = await request.post(`public/v2/users`, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: userData
    });

    // Verify user creation
    expect(createUserResponse.status()).toBe(201);
    const createUserResponseBody = await createUserResponse.json();

    // Save userID
    userId = createUserResponseBody.id;
    expect(userId).toBeTruthy();
  });

  test('should delete user with valid data', async ({ request }) => {
    // delete the user
    const deleteResponse = await request.delete(`public/v2/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`
      }
    });
    expect(deleteResponse.status()).toBe(204);
  });
  // Optional: find userID with GET and double check that user has been deleted 
});
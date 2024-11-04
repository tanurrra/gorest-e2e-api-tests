
import { test, expect } from '@playwright/test';

const BEARER_TOKEN = 'put-your-token-here';
// Load environment variables (e.g., Bearer Token) from .env file or environment
// const BEARER_TOKEN = process.env.BEARER_TOKEN || 'YOUR_TOKEN_HERE';

// POST Create User Data
const userData = {
  name: 'John Doe',
  gender: 'male',
  email: `john.doe.test.${Date.now()}@test.com`, // unique email to avoid duplicates
  status: 'active'
};

test.describe('Users POST Endpoint', () => {
  test('should create a new user with valid data', async ({ request }) => {
    const response = await request.post(`public/v2/users`, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: userData
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    // Verify the response contains the correct data structure and content
    expect(responseBody).toMatchObject({
      name: userData.name,
      gender: userData.gender,
      email: userData.email,
      status: userData.status
    });

    // Optional: Validate specific fields
    expect(responseBody).toHaveProperty('id');
    expect(typeof responseBody.id).toBe('number');

    // Optional: find userID with GET and double check that user has been created 
  });
});
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Test JWT token generation
const testToken = jwt.sign(
  {
    id: 1,
    zaloId: 'test123',
    role: 'user',
    username: 'test_user',
  },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

console.log('=== TEST TOKEN ===');
console.log('Token:', testToken);
console.log('\n=== DECODED ===');
console.log(jwt.decode(testToken));

console.log('\n=== TEST CURL COMMANDS ===');
console.log('\n1. Test sync user:');
console.log(`curl -X POST http://localhost:5000/api/users/sync \\
  -H "Content-Type: application/json" \\
  -d '{"id":"test123","name":"Test User"}'`);

console.log('\n2. Get my students (với token):');
console.log(`curl http://localhost:5000/api/students \\
  -H "Authorization: Bearer ${testToken}"`);

console.log('\n3. Claim student (với token):');
console.log(`curl -X POST http://localhost:5000/api/students/claim \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${testToken}" \\
  -d '{"studentCode":"HS2025001"}'`);

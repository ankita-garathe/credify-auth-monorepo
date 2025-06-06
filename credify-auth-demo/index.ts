import {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} from 'credifyauth'; // Replace with your actual package name if scoped

// 🔐 Dummy User in "DB"
const dummyUser = {
  email: 'demo@example.com',
  password: '', // will be hashed at start
};

const simulateLoginFlow = async () => {
  // ✅ STEP 1: Registration (hash password & save)
  dummyUser.password = await hashPassword('admin123');
  console.log('Registered user with hashed password:', dummyUser);

  // ✅ STEP 2: Login (compare password)
  const loginEmail = 'demo@example.com';
  const loginPassword = 'admin123';

  if (loginEmail !== dummyUser.email) {
    console.log('User not found');
    return;
  }

  const isPasswordValid = await comparePassword(loginPassword, dummyUser.password);

  if (!isPasswordValid) {
    console.log('Invalid password');
    return;
  }

  // ✅ STEP 3: Generate JWT Token
  const token = generateToken({ userId: '12345', email: loginEmail });
  console.log('Generated Token:', token);


  const hashedPassword = await hashPassword('admin123');
console.log('Hashed Password (for dev only):', hashedPassword);


  // ✅ STEP 4: Verify JWT Token
  const decoded = verifyToken(token);
  console.log('Decoded Token:', decoded);
};

simulateLoginFlow();

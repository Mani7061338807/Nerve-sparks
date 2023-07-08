const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const {MongoClient, Int32} = require('mongodb');
const { string } = require('i/lib/util');
const router = express.Router();
const dbName = "Nerve-Sparks";
const url = "mongodb+srv://manishankarkumar789:mani@cluster0.vgopnh9.mongodb.net/";

// Secret key for JWT
const secretKey = 'kasfklhlkjlwuriuvajkjbn';
router.post('/admin/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('admins');

    // Check if the admin already exists
    const existingAdmin = await collection.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash the admin's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the admin document
    const admin = {
      email,
      password: hashedPassword
    };

    // Insert the admin data
    const result = await collection.insertOne(admin);
    console.log('Admin registered successfully:', result.insertedId);

    // Generate a JWT token
    const token = jwt.sign({ email: admin.email }, secretKey);

    res.status(201).json({ message: 'Admin registered successfully', token });
  } catch (err) {
    console.error('Error registering admin:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  
  // Admin login route
  router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const client = new MongoClient(url);
      await client.connect();
  
      const db = client.db(dbName);
      const collection = db.collection('admins');
  
      // Check if the admin exists
      const admin = await collection.findOne({ email });
      if (!admin) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ email: admin.email }, secretKey);
  
      res.status(200).json({ token });
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // User registration route
  router.post('/user/register',async (req, res) => {
    const { email, userId, userLoc, userInfo, password} = req.body;


  try {
    const client = new MongoClient(url);
    await client.connect();
    
    const db = client.db(dbName);
    const collection = db.collection('users');
    const userSchema = {
      email:{
        type:string
      },
      userId:Int32,
      userLoc:string,
      userInfo:string,
      password: string,
      vehicleInfo:[],     
    };
    // Check if the admin already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash the admin's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the admin document
    const newUser = {
      email,
      userId,
      userLoc,
      userInfo,
      password: hashedPassword,
      vehicleInfo:[],
    };
    
    // Insert the admin data
    const result = await collection.insertOne(newUser);

    console.log('User registered successfully:');

    const soldVehicle = {
      vechileid: result.insertedId, // Reference to the user document
      carid: '123',
      vechileinfo: 'Some information about the vehicle'
    };
    // Generate a JWT token
    const token = jwt.sign({ email: newUser.email }, secretKey);

    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error('Error registering admin:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
  });
  
  // User login route
router.post('/user/login',async (req, res) => {
  const { email, password } = req.body;
  
    try {
      const client = new MongoClient(url);
      await client.connect();
  
      const db = client.db(dbName);
      const collection = db.collection('users');
  
      // Check if the admin exists
      const user = await collection.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ email: user.email }, secretKey);
  
      res.status(200).json({ token });
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
  // Dealer registration route
router.post('/dealer/register', async(req, res) => {
  const { email, password } = req.body;

  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('dealership');

    // Check if the admin already exists
    const existingDealer = await collection.findOne({ email });
    if (existingDealer) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash the admin's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the admin document
    const newDealer = {
      email,
      password: hashedPassword
    };

    // Insert the admin data
    const result = await collection.insertOne(newDealer);
    console.log('Dealer registered successfully:', result.insertedId);

    // Generate a JWT token
    const token = jwt.sign({ email: newDealer.email }, secretKey);

    res.status(201).json({ message: 'Dealer registered successfully', token });
  } catch (err) {
    console.error('Error registering Dealer:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
  // Dealer login route
router.post('/dealer/login', async(req, res) => {
  const { email, password } = req.body;
  
  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('dealership');

    // Check if the admin exists
    const dealer = await collection.findOne({ email });
    if (!dealer) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, dealer.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: dealer.email }, secretKey);

    res.status(200).json({ token });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
  // Logout route
router.post('/logout', (req, res) => {
   const token = req.headers.authorization;

   // Save the token to the blacklist
    mongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
        console.error('Error connecting to MongoDB:', err);
        res.status(500).json({ error: 'Failed to connect to database' });
        return;
    }

    const db = client.db(dbName);
    const collection = db.collection(blacklistedTokensCollection);

    // Add the token to the blacklist
    collection.insertOne({ token }, (err, result) => {
    if (err) {
        console.error('Error blacklisting token:', err);
        res.status(500).json({ error: 'Failed to logout' });
        return;
    }

       res.json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;
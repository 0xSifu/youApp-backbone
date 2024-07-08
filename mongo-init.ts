import { MongoClient } from 'mongodb';

async function initializeMongoDB() {
  const url = 'mongodb://admin:master123@localhost:27017/admin';
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('admin');

    // Create user with permissions on the youapp-user database
    await db.command({
      createUser: 'admin',
      pwd: 'master123',
      roles: [
        { role: 'readWrite', db: 'admin' },
        { role: 'readWrite', db: 'youapp-user' }
      ],
    });

    console.log('User created with appropriate roles');

  } catch (err) {
    console.error('Failed to initialize MongoDB:', err);
  } finally {
    await client.close();
  }
}

initializeMongoDB().catch(console.error);
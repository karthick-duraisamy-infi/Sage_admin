
import { db } from './db';
import { users } from '../shared/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function seed() {
  try {
    console.log('Starting database seed...');

    // Check if admin user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, 'admin@sage.com')
    });

    if (existingUser) {
      console.log('Admin user already exists, skipping seed.');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('Infi@123', 10);

    // Insert admin user
    await db.insert(users).values({
      username: 'admin@sage.com',
      password: hashedPassword,
    });

    console.log('Admin user created successfully!');
    console.log('Username: admin@sage.com');
    console.log('Password: Infi@123');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log('Seed completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });

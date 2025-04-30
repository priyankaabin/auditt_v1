import pg from 'pg';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

// Create Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function seed() {
  const client = new pg.Client({
    host: 'localhost',
    port: 5432,
    database: 'familycreatives',
    user: 'postgres',
    password: 'admin',
    ssl: false
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully');
    
    // Start transaction
    await client.query('BEGIN');

    // Create admin user
    const adminEmail = 'admin@familycreatives.com';
    const adminPassword = 'admin123';
    
    // Sign up admin user through Supabase
    const { data: adminData, error: adminError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        emailRedirectTo: `${process.env.VITE_SUPABASE_URL}/auth/v1/verify`
      }
    });

    if (adminError) {
      throw adminError;
    }

    if (adminData.user) {
      // Create admin profile
      await client.query(`
        INSERT INTO profiles (
          user_id,
          display_name,
          bio,
          avatar_type,
          tier,
          points
        ) VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id) DO NOTHING
      `, [
        adminData.user.id,
        'Admin',
        'System Administrator',
        'initials',
        'diamond',
        1000
      ]);

      // Make user an admin
      await client.query(`
        INSERT INTO admin_users (user_id) 
        VALUES ($1)
        ON CONFLICT (user_id) DO NOTHING
      `, [adminData.user.id]);
    }

    // Create regular test user
    const userEmail = 'user@familycreatives.com';
    const userPassword = 'user123';
    
    // Sign up regular user through Supabase
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
      options: {
        emailRedirectTo: `${process.env.VITE_SUPABASE_URL}/auth/v1/verify`
      }
    });

    if (userError) {
      throw userError;
    }

    if (userData.user) {
      // Create user profile
      await client.query(`
        INSERT INTO profiles (
          user_id,
          display_name,
          bio,
          avatar_type,
          tier,
          points
        ) VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id) DO NOTHING
      `, [
        userData.user.id,
        'Test User',
        'Regular test user account',
        'initials',
        'bronze',
        0
      ]);
    }

    // Commit transaction
    await client.query('COMMIT');
    console.log('Seed data inserted successfully');
    console.log('\nYou can now log in with these credentials:');
    console.log('\nAdmin User:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('\nRegular User:');
    console.log('Email:', userEmail);
    console.log('Password:', userPassword);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
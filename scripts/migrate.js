import pg from 'pg';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrate() {
  const client = new pg.Client({
    host: 'localhost',
    port: 5432,
    database: 'familycreatives',
    user: 'postgres',
    password: 'admin', // Make sure this matches your PostgreSQL password
    ssl: false // Disable SSL for local development
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully');
    
    // Read and execute the schema SQL
    const schemaPath = join(__dirname, '..', 'schema.sql');
    const schemaSql = await readFile(schemaPath, 'utf8');
    
    console.log('Running migrations...');
    await client.query(schemaSql);
    console.log('Migrations completed successfully');
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
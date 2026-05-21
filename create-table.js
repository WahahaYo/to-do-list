require('dotenv').config()
const postgres = require('postgres')

async function createTable() {
  const sql = postgres(process.env.DATABASE_URL)
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('Table created successfully!')
  } catch (e) {
    console.error('Error creating table:', e)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

createTable()
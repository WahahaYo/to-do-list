require('dotenv').config()
const postgres = require('postgres')

async function test() {
  const sql = postgres(process.env.DATABASE_URL)
  try {
    const result = await sql`SELECT * FROM todos`
    console.log('Success:', result)
  } catch (e) {
    console.error('Error:', e)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

test()
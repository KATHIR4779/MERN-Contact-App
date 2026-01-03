const { MongoClient, ObjectId } = require('mongodb')

const uri = process.env.MONGO_URI
let cachedClient = global.__mongoClient

async function connect() {
  if (cachedClient) return cachedClient
  if (!uri) throw new Error('MONGO_URI not set')
  const client = new MongoClient(uri)
  await client.connect()
  cachedClient = client
  global.__mongoClient = client
  return client
}

module.exports = async (req, res) => {
  try {
    const client = await connect()
    const db = client.db()
    const coll = db.collection('contacts')
    const { id } = req.query || {}

    if (!id) return res.status(400).json({ error: 'Missing id' })

    if (req.method === 'DELETE') {
      const oid = new ObjectId(id)
      const r = await coll.deleteOne({ _id: oid })
      if (r.deletedCount === 0) return res.status(404).json({ error: 'Contact not found' })
      return res.status(200).json({ message: 'Deleted', id })
    }

    res.setHeader('Allow', 'DELETE')
    return res.status(405).end()
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}

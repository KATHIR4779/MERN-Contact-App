const { MongoClient } = require('mongodb')

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

    if (req.method === 'GET') {
      const docs = await coll.find().sort({ createdAt: -1 }).toArray()
      return res.status(200).json(docs)
    }

    if (req.method === 'POST') {
      const { name, email, phone, message } = req.body || {}
      const errors = []
      if (!name || !String(name).trim()) errors.push('Name is required')
      if (!phone || !String(phone).trim()) errors.push('Phone is required')
      if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('Invalid email')
      if (errors.length) return res.status(400).json({ errors })

      const doc = { name: String(name).trim(), email: email ? String(email).trim() : '', phone: String(phone).trim(), message: message ? String(message).trim() : '', createdAt: new Date() }
      const r = await coll.insertOne(doc)
      doc._id = r.insertedId
      return res.status(201).json(doc)
    }

    res.setHeader('Allow', 'GET,POST')
    return res.status(405).end()
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}

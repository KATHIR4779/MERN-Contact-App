import React, { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

// Use Vite env `VITE_API_URL` if present; otherwise fall back to machine IP where the server is reachable
const API = import.meta.env.VITE_API_URL || 'http://10.153.238.82:5000'

export default function App(){
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API}/api/contacts`)
      const data = await res.json()
      setContacts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchContacts() }, [])

  const addContact = (c) => setContacts(prev => [c, ...prev])
  const removeContact = (id) => setContacts(prev => prev.filter(p => p._id !== id))

  return (
    <div className="container">
      <header>
        <h1>MERN Contact Manager</h1>
      </header>
      <main>
        <ContactForm onAdd={addContact} apiBase={API} />
        <hr />
        <h2>Contacts</h2>
        {loading ? <p>Loading...</p> : <ContactList contacts={contacts} onDelete={removeContact} apiBase={API} />}
      </main>
    </div>
  )
}

import React from 'react'

export default function ContactList({ contacts = [], onDelete, apiBase }){
  const handleDelete = async (id) => {
    if (!confirm('Delete this contact?')) return
    try {
      const res = await fetch(`${apiBase}/api/contacts/${id}`, { method: 'DELETE' })
      if (res.ok) onDelete(id)
      else console.error('Delete failed')
    } catch (err) { console.error(err) }
  }

  if (!contacts.length) return <p>No contacts yet.</p>

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th></th></tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td className="msg">{c.message || ''}</td>
              <td><button className="del" onClick={() => handleDelete(c._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

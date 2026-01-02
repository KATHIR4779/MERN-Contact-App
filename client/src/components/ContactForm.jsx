import React, { useState } from 'react'

export default function ContactForm({ onAdd, apiBase }){
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  const validate = (f) => {
    const e = {}
    if (!f.name.trim()) e.name = 'Name is required'
    if (!f.phone.trim()) e.phone = 'Phone is required'
    if (f.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = 'Invalid email'
    return e
  }

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const eobj = validate(form)
    if (Object.keys(eobj).length) return setErrors(eobj)

    setSubmitting(true)
    setSuccess('')
    try {
      const res = await fetch(`${apiBase}/api/contacts`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) {
        const msg = data.errors ? data.errors.map(x=>x.msg).join(', ') : data.error || 'Error'
        setErrors({ form: msg })
      } else {
        onAdd(data)
        setForm({ name: '', email: '', phone: '', message: '' })
        setSuccess('Contact saved ✅')
      }
    } catch (err) {
      setErrors({ form: 'Network error' })
    } finally { setSubmitting(false) }
  }

  const invalid = Object.keys(validate(form)).length > 0

  return (
    <section className="card">
      <h2>Contact Form</h2>
      <form onSubmit={onSubmit} noValidate>
        <label>Name *</label>
        <input name="name" value={form.name} onChange={onChange} />
        {errors.name && <small className="err">{errors.name}</small>}

        <label>Email</label>
        <input name="email" value={form.email} onChange={onChange} />
        {errors.email && <small className="err">{errors.email}</small>}

        <label>Phone *</label>
        <input name="phone" value={form.phone} onChange={onChange} />
        {errors.phone && <small className="err">{errors.phone}</small>}

        <label>Message</label>
        <textarea name="message" value={form.message} onChange={onChange} />

        {errors.form && <div className="err">{errors.form}</div>}
        {success && <div className="success">{success}</div>}

        <button type="submit" disabled={invalid || submitting}>{submitting ? 'Saving...' : 'Submit'}</button>
      </form>
    </section>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'

// 物件の新規登録・編集で共通して使う入力フォーム
export default function PropertyForm({ initialValues, submitLabel, onSubmit }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent?.toString() ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await onSubmit({ name: name.trim(), rent: Number(rent), area: area.trim() })
    } catch (err) {
      setError(`保存に失敗しました：${err.message}`)
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <label>
        物件名
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        家賃（円/月）
        <input
          type="number"
          min="0"
          step="1"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          required
        />
      </label>
      <label>
        エリア
        <input value={area} onChange={(e) => setArea(e.target.value)} required />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? '保存中...' : submitLabel}
      </button>
      <Link to="/properties" className="cancel-link">キャンセル</Link>
    </form>
  )
}

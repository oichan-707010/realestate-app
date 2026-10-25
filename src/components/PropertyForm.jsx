import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PROPERTY_TYPES, isRental } from '../lib/propertyTypes'

// 物件の新規登録・編集で共通して使う入力フォーム
export default function PropertyForm({ initialValues, submitLabel, onSubmit }) {
  const [propertyType, setPropertyType] = useState(initialValues?.property_type ?? 'rental')
  const [name, setName] = useState(initialValues?.name ?? '')
  const [price, setPrice] = useState(initialValues?.price?.toString() ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await onSubmit({
        property_type: propertyType,
        name: name.trim(),
        price: Number(price),
        area: area.trim(),
        layout: layout.trim(),
      })
    } catch (err) {
      setError(`保存に失敗しました：${err.message}`)
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <label>
        種別
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          {PROPERTY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        物件名
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        {/* 賃貸は月額家賃、売買は販売価格を入力する */}
        {isRental(propertyType) ? '家賃（円/月）' : '価格（円）'}
        <input
          type="number"
          min="0"
          step="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        エリア
        <input value={area} onChange={(e) => setArea(e.target.value)} required />
      </label>
      <label>
        間取り
        <input
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          placeholder="例：1LDK"
          required
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? '保存中...' : submitLabel}
      </button>
      <Link to="/properties" className="cancel-link">キャンセル</Link>
    </form>
  )
}

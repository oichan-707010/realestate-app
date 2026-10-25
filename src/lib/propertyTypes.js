// 物件種別の一覧（value はDBに保存する値、label は画面表示用）
// 種別を追加する場合は、DBの check 制約も合わせて変更すること
export const PROPERTY_TYPES = [
  { value: 'rental', label: '賃貸' },
  { value: 'new_house', label: '新築戸建' },
  { value: 'used_house', label: '中古戸建' },
  { value: 'new_condo', label: '新築マンション' },
  { value: 'used_condo', label: '中古マンション' },
]

// 種別の表示名を取得
export function propertyTypeLabel(value) {
  return PROPERTY_TYPES.find((t) => t.value === value)?.label ?? value
}

// 賃貸かどうか（金額を「家賃（月額）」と「価格」のどちらで扱うかの判定に使う）
export function isRental(value) {
  return value === 'rental'
}

// 金額の表示文字列を作成
export function formatPrice(property) {
  const amount = property.price.toLocaleString()
  return isRental(property.property_type) ? `家賃：${amount}円/月` : `価格：${amount}円`
}

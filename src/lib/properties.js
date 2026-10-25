import { supabase } from './supabase'

// 物件テーブルの操作（RLSにより、ログイン中のユーザーの物件のみが対象になる）

// 一覧を新しい順で取得
export async function fetchProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('id, name, rent, area, layout')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// 1件取得
export async function fetchProperty(id) {
  const { data, error } = await supabase
    .from('properties')
    .select('id, name, rent, area, layout')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

// 新規登録（user_id はDB側のデフォルト値でログインユーザーが入る）
export async function createProperty(property) {
  const { error } = await supabase.from('properties').insert(property)
  if (error) throw error
}

// 更新
export async function updateProperty(id, property) {
  const { error } = await supabase.from('properties').update(property).eq('id', id)
  if (error) throw error
}

// 削除
export async function deleteProperty(id) {
  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) throw error
}

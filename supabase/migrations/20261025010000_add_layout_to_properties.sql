-- 物件テーブルに「間取り」列を追加する
-- Supabaseダッシュボードの SQL Editor で1回だけ実行する（再実行してもエラーにならない）
alter table public.properties
  add column if not exists layout text not null default '';

-- 既存の行は空文字で埋めたうえで、今後はアプリから必ず値を入れるためデフォルト値を外す
alter table public.properties
  alter column layout drop default;

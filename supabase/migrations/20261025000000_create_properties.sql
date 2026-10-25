-- 物件テーブル
-- Supabaseダッシュボードの SQL Editor で実行する
create table public.properties (
  id bigint generated always as identity primary key,
  -- 登録したユーザー（未指定ならログイン中のユーザーが入る）
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null,
  rent integer not null check (rent >= 0),
  area text not null,
  created_at timestamptz not null default now()
);

-- ログインユーザーにのみ操作を許可する
grant select, insert, update, delete on public.properties to authenticated;

-- 行レベルセキュリティ：自分が登録した物件だけ参照・編集・削除できる
alter table public.properties enable row level security;

create policy "自分の物件を参照" on public.properties
  for select to authenticated using (auth.uid() = user_id);

create policy "自分の物件を登録" on public.properties
  for insert to authenticated with check (auth.uid() = user_id);

create policy "自分の物件を更新" on public.properties
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "自分の物件を削除" on public.properties
  for delete to authenticated using (auth.uid() = user_id);

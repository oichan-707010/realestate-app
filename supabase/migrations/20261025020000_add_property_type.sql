-- 物件種別（賃貸・新築戸建・中古戸建・新築マンション・中古マンション）を追加し、
-- 売買物件にも対応できるよう金額の列名を rent（家賃）から price（金額）に変更する
-- Supabaseダッシュボードの SQL Editor で実行する（再実行してもエラーにならない）

-- 物件種別。既存の物件はすべて賃貸として扱う
alter table public.properties
  add column if not exists property_type text not null default 'rental'
  check (property_type in ('rental', 'new_house', 'used_house', 'new_condo', 'used_condo'));

-- 金額の列名を変更（賃貸なら月額家賃、売買なら販売価格を入れる）
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'properties' and column_name = 'rent'
  ) then
    alter table public.properties rename column rent to price;
  end if;
end $$;

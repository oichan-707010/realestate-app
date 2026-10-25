# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code 向けのガイドです。

## プロジェクト概要

不動産アプリ（realestate-app）。

Supabase認証付きの不動産管理Webアプリ。メールアドレス＋パスワードで会員登録・ログインし、ログイン後に物件一覧（現在はダミーデータ）を表示する。

## 技術スタック

- React + Vite（JavaScript / JSX）
- React Router（ルーティング）
- Supabase（認証。`@supabase/supabase-js`）

## 環境変数

`.env` に以下を設定する（`.gitignore` 済み。雛形は `.env.example`）。

- `VITE_SUPABASE_URL`: Supabase の Project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Supabase の Publishable key

## よく使うコマンド

- 依存関係のインストール: `npm install`
- 開発サーバー起動: `npm run dev`
- ビルド: `npm run build`
- テスト / Lint: 未導入

## ディレクトリ構成

- `src/lib/supabase.js`: Supabase クライアント
- `src/contexts/AuthContext.jsx`: ログイン状態の管理（`useAuth` フック）
- `src/components/ProtectedRoute.jsx`: 未ログイン時にログイン画面へリダイレクト
- `src/components/GuestRoute.jsx`: ログイン済み時に物件一覧へリダイレクト
- `src/pages/`: 画面（Login / Signup / Properties）
- `src/data/properties.js`: 物件のダミーデータ

## Git 運用ルール

- **コードを変更するたびに、コミットして GitHub にプッシュすること。** 変更をローカルに溜めたままにしない。
- 1 コミットには 1 つのまとまった変更だけを含める。
- コミットメッセージは変更内容が分かるように簡潔に書く（日本語可）。
  - 例: `物件一覧ページに価格での絞り込みを追加`
- プッシュ前に、テスト・Lint が用意されていれば実行し、通ることを確認する。
- `.env`、API キー、パスワードなどの機密情報は絶対にコミットしない（`.gitignore` で除外する）。
- `git push --force` や履歴の書き換えは、ユーザーの明示的な指示がない限り行わない。

## コーディング規約

- 既存コードのスタイル・命名規則・書き方に合わせる。
- 物件情報や個人情報（問い合わせ者の氏名・連絡先など）の扱いには注意し、ログに出力しない。

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

// ログイン状態をアプリ全体に提供するプロバイダー
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // セッション確認が終わるまでは画面を出さない（リダイレクトのちらつき防止）
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 起動時に既存のセッションを取得
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    // ログイン・ログアウトなどの状態変化を監視
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signUp: (email, password) => supabase.auth.signUp({ email, password }),
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 認証情報を取得するためのフック
export function useAuth() {
  return useContext(AuthContext)
}

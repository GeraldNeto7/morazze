'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
      return { error: 'Preencha todos os campos corretamente.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Retorna erros se a auth falhar
  if (error) {
    let errorMessage = "Ocorreu um erro no login.";
    if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha inválidos.';
    } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Confirme o seu endereço de email antes de logar.';
    }
    return { error: errorMessage }
  }

  // Redireciona na raiz (ou dashboard) em caso de sucesso
  redirect('/dashboard')
}

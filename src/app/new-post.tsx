import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import type { Database } from '@/types/supabase'

export default function NewPost() {
  const addPost = async (formData: FormData) => {
    'use server'
    console.log('formData', formData);
    const content = String(formData.get('content'))
    const title = String(formData.get('title'))
    const supabase = createServerActionClient<Database>({ cookies })
    await supabase.from('posts').insert({ title,content }).select()
    revalidatePath('/')
  }

  return (
    <form action={addPost}>
      <input type="text" name="title" placeholder='タイトル'/>
      <input type="text" name="content" placeholder='本文'/>
      <button type='submit'>送信</button>
    </form>
  )
}
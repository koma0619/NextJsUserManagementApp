import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import RealtimePosts from './realtime-posts'
import NewPost from './new-post'

import type { Database } from '@/types/supabase'


export default async function ServerComponent() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
  const { data } = await supabase.from('profiles').select('*')

  return (
    <>
      {/* <NewPost /> */}
      <RealtimePosts serverPosts={data ?? []} />
    </>
  )
}
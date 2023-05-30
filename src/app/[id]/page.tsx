import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { notFound, redirect } from 'next/navigation'
import RealtimePost from './realtime-post'
import { cookies } from 'next/headers'

import type { Database } from '../../../types/supabase'

export default async function Post({ params: { id } }: { params: { id: string } }) {
    const supabase = createServerComponentClient<Database>({
        cookies,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        // this is a protected route - only users who are signed in can view this route
        redirect('/')
    }

    const { data: post } = await supabase.from('profiles').select().match({ id }).single()

    if (!post) {
        notFound()
    }

    return (
        <>
            <h3>ログイン後画面</h3>
            <RealtimePost serverPost={post} />
        </>
    )
}
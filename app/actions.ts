'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

export async function register(prevState: any, formData: FormData) {
  try {
    const fullname = formData.get('fullname') as string
    const email = formData.get('email') as string
    const tel = formData.get('tel') as string

    // get formData from input type file name 'attachment'
    const attachment = formData.get('attachment') as File

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // // upload attachment to supabase storage
    const uuidFileName = uuidv4()

    const { error } = await supabase.storage
      .from('attachments')
      .upload(uuidFileName, attachment)

    if (error) {
      console.log('error upload file', error)
      return { message: 'cannot upload attachment' }
    }

    const { data: attachmentUrl } = await supabase.storage
      .from('attachments')
      .getPublicUrl(uuidFileName)

    // insert data to supabase table users with these 4 fields
    const { error: insertError } = await supabase.from('users').insert({
      fullname,
      email,
      tel,
      attachment: attachmentUrl.publicUrl,
    })

    if (insertError) {
      console.log('error', insertError)
      return { message: 'Could not register user' }
    }

    // success case when update correct
    return { success: true }
  } catch (error) {
    console.log('server error', error)
    return { message: 'Server error' }
  }
}

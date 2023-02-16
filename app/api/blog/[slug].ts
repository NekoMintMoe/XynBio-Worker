import { checkEnvInit } from '@/lib/init'
import { commonResponse, jsonResponse } from '@/lib/utils'
import { NextRequest } from 'next/server'
  
export default async function handler (req: NextRequest){
    if (!checkEnvInit()) return await commonResponse(500)

    const { searchParams } = new URL(req.url??'')
    const slug = searchParams.get('slug') as string

    const metadata = {
        title: 'Hello World',
        subtitle: 'This is a subtitle',
        date: '2021-01-01',
        author: 'John Doe',
        keyword: 'hello world',
        slug: slug,
    }
    const link = 'https://github.com'
    const content = 'This is the content of the post'
    const activity = {
        comments: 0,
        likes: 0,
        shares: 0
    }
    const DataArray = { link: link, metadata: metadata, content: content, activity: activity }
    const data = {
        code: 200,
        data: DataArray
    }

    return await jsonResponse(200, data)
}
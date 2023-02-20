import { commonResponse, jsonResponse, jwtDetect } from '../../lib/utils'
import { Handler } from 'worktop'

export const BlogListHandler: Handler = async function (req, res) {
    if (!await jwtDetect(req)) return await commonResponse(res, 401)
    
    const metadata = {
      title: 'Hello World',
      subtitle: 'This is a subtitle',
      date: '2021-01-01',
      author: 'John Doe',
      keyword: 'hello world',
      slug: 'hello-world',
    }
    const link = 'https://github.com'
    const DataArray = [{ link: link, metadata: metadata }, { link: link, metadata: metadata }]
    const data = {
      code: 200,
      data: DataArray
    }
  
    return await jsonResponse(res, 200, data)
}
  
export const BlogContentHandler: Handler = async function (req, res) {
    if (!await jwtDetect(req)) return await commonResponse(res, 401)
    const slug = req.params.slug

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

    return await jsonResponse(res, 200, data)
}

export const BlogCommentHandler: Handler =  async function (req, res){
    if (!await jwtDetect(req)) return await commonResponse(res, 401)
    const slug = req.params.slug

    const metadata = {
        title: 'Hello World',
        user: 'John Doe',
        github: 'https://github.com',
        date: '2021-01-01',
    }
    const link = 'https://github.com'
    const content = 'This is the content of the comment'
    const DataArray = [{ link: link, metadata: metadata, content: content }, { link: link, metadata: metadata, content: content }]
    const data = {
        code: 200,
        data: DataArray
    }

    return await jsonResponse(res, 200, data)
}
export async function jsonResponse(status: number, data: any, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function commonResponse(code: number) {
  switch(code) {
    default:
      return await jsonResponse(500, { code: 500, message: 'Internal Server Error' })
    case 404:
      return await jsonResponse(404, { code: 404, message: 'Not Found' })
    case 403:
      return await jsonResponse(403, { code: 403, message: 'Forbidden' })
    case 401:
      return await jsonResponse(401, { code: 401, message: 'Unauthorized' })
    case 400:
      return await jsonResponse(400, { code: 400, message: 'Bad Request' })
    case 409:
      return await jsonResponse(409, { code: 409, message: 'Conflict' })
    case 410:
      return await jsonResponse(410, { code: 410, message: 'Gone' })
    case 405:
      return await jsonResponse(405, { code: 405, message: 'Method Not Allowed' })
  }
}
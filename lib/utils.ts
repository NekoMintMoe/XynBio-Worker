import { verifyJWT } from "./auth"

export async function jsonResponse (res: any, code: number, data: any) {
  return res.send(
    code,
    data,
    { 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',})
}

export async function commonResponse (res: any, code: number) {
  switch(code) {
    default:
      return jsonResponse(res, 500, { code: 500, message: 'Internal Server Error' })
    case 404:
      return jsonResponse(res, 404, { code: 404, message: 'Not Found' })
    case 403:
      return jsonResponse(res, 403, { code: 403, message: 'Forbidden' })
    case 401:
      return jsonResponse(res, 401, { code: 401, message: 'Unauthorized' })
    case 400:
      return jsonResponse(res, 400, { code: 400, message: 'Bad Request' })
    case 409:
      return jsonResponse(res, 409, { code: 409, message: 'Conflict' })
    case 410:
      return jsonResponse(res, 410, { code: 410, message: 'Gone' })
    case 405:
      return jsonResponse(res, 405, { code: 405, message: 'Method Not Allowed' })
  }
}

export async function jwtDetect (req: any) {
  const auth = req.headers.get("Authorization")?.replace("Bearer ", "") || ""
  if (!auth) return false
  if (await verifyJWT(auth) != "valid") return false
  return true
}
import { checkEnvInit } from '@/lib/init'
import { commonResponse, jsonResponse } from '@/lib/utils'

export default async function handler() {
  if (!checkEnvInit()) return await commonResponse(500)
  return await jsonResponse(200, { text: 'Hello World!' })
}

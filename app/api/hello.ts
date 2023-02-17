import { Handler } from 'worktop'
import { checkEnvInit } from '../../lib/init'
import { commonResponse, jsonResponse } from '../../lib/utils'

export const helloHandler: Handler = async function (req, res) {
  if (!checkEnvInit()) return await commonResponse(res, 500)
  return await jsonResponse(res, 200, { text: 'Hello World!' })
}

export const defaultPage: Handler = async function(req, res) {
	return await commonResponse(res, 404)
}
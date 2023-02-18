import { Handler } from 'worktop'
import { commonResponse, jsonResponse } from '../../lib/utils'

export const helloHandler: Handler = async function (req, res) {
  return await jsonResponse(res, 200, { text: 'Hello World!' })
}

export const defaultPage: Handler = async function(req, res) {
	return await commonResponse(res, 404)
}
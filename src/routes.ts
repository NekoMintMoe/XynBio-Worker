import { Handler, listen, Router } from 'worktop';
import { preflight } from 'worktop/cors'
import * as TokenEndpoint from '../app/api/token'
import { commonResponse, jsonResponse } from '../lib/utils';

const DefaultPage: Handler = async function(req, res) {
	return await commonResponse(res, 404)
}

const API = new Router();
API.prepare = preflight({
	origin: '*',
	headers: ['Cache-Control', 'Content-Type'],
	methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE']
});

API.add('GET', '/*', DefaultPage)
API.add('POST', '/api/token', TokenEndpoint.jwtHandler)

listen(API.run);
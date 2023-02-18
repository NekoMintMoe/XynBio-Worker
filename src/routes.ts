import { listen, Router } from 'worktop';
import { preflight } from 'worktop/cors'
import * as TokenEndpoint from '../app/_sudo/token'
import * as HelloEndpoint from '../app/api/hello'

const API = new Router();
API.prepare = preflight({
	origin: '*',
	headers: ['Cache-Control', 'Content-Type'],
	methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE']
});

API.add('GET', '/*', HelloEndpoint.defaultPage)
API.add('GET', '/api/hello', HelloEndpoint.helloHandler)
API.add('POST', '/_sudo/token', TokenEndpoint.jwtHandler)

listen(API.run);
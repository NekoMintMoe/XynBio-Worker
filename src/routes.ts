import { listen, Router } from 'worktop';
import { preflight } from 'worktop/cors'
import * as TokenEndpoint from '../app/_sudo/token'
import * as HelloEndpoint from '../app/api/hello'
import * as BlogEndpoint from '../app/api/blog'

const API = new Router();
API.prepare = preflight({
	origin: '*',
	headers: ['Cache-Control', 'Content-Type'],
	methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE']
});

API.add('GET', '/*', HelloEndpoint.defaultPage)
API.add('GET', '/api/hello', HelloEndpoint.helloHandler)
API.add('GET', '/api/blog', BlogEndpoint.BlogListHandler)
API.add('GET', '/api/blog/:slug', BlogEndpoint.BlogContentHandler)
API.add('GET', '/api/blog/:slug/comments', BlogEndpoint.BlogCommentHandler)
API.add('POST', '/_sudo/token', TokenEndpoint.jwtHandler)

listen(API.run);
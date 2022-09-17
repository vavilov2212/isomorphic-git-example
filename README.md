## example of using [`isomorphic-git`](https://github.com/isomorphic-git/isomorphic-git) in browser

### Using CORS

Install [`cors-proxy`](https://github.com/isomorphic-git/cors-proxy) package. Default port is 9999. Place the http://localhost:9999 in `pages/api/simpleClone/clone.ts` as corsProxy parameter of git.clone function.

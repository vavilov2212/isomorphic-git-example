## example of using (`isomorphic-git`)[https://github.com/isomorphic-git/isomorphic-git] in browser

### Using CORS

Install (`cors-proxy`)[https://github.com/isomorphic-git/cors-proxy} package. Default port is 9999. Place the http://localhost:9999 in `pages/api/simpleClone/clone.ts` as corsProxy parameter of git.clone function.

If your using github, it seems to automaticly expire access tokens, that are used to push (even if tokens are 'no expiration'). So if the response is 401 Unauthorized - regenerate acess token. Login to github, go to "Settings" -> "Developer settings" -> "Personal access tokens"

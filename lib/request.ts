import { request as delegate } from 'isomorphic-git/http/node';
import { HttpProxyAgent, HttpsProxyAgent } from 'hpagent';

async function request ({ url, method, headers, body }) {
  const proxy = url.startsWith('https:')
    ? { Agent: HttpsProxyAgent, url: 'https://cors.isomorphic-git.org' } 
    : { Agent: HttpProxyAgent, url: process.env.http_proxy }
  const agent = proxy.url ? new proxy.Agent({ proxy: proxy.url }) : undefined
  return delegate({ url, method, headers, agent, body })
}

export default { request };

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/simpleAdd',
        permanent: true
      },
    ]
  },
}

module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.2.*'],
  async redirects() {
    // /termekek has no index of its own; the product list is /bolt.
    return [{ source: '/termekek', destination: '/bolt', permanent: false }]
  },
}

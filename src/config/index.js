if (typeof window === 'undefined') global.window = { location: { host: 'testhost' } }

const env = ((host) => {
  switch (true) {
    case host.includes('10.0.75.1'):
      return 'production'
    case host.includes('localhost'):
      return 'develop'
    default:
      return 'develop'
  }
})(window.location.host)


export const config = require(`./config.${env}`)
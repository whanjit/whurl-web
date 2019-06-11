export class Helper {
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  resp(res = {}) {
    if (res.statusCode === 404) { return { result: false, message: 'page not found' } }

    if (res.statusCode !== 200 && res.statusCode !== 204) {
      let msg = ''
      if (res.body.error) msg = res.body.error.message
      else if (res.body.message) msg = res.body.message
      else msg = res.body
      return { result: false, message: msg }
    } else return { result: true, body: res.body }
  }

  respSuccess(res = { body: '' }) {
    return { result: true, body: res.body }
  }

  respError(message) {
    return { result: false, message }
  }

  respCatch(e = {}) {
    return { result: false, message: e.message }
  }
}

export const helper = new Helper()
export default helper
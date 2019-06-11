import { createBrowserHistory } from 'history'

export const history = window.document
  ? createBrowserHistory()
  : {
    push: () => {}
  }

export default history
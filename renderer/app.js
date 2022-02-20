import {createSSRApp, h} from 'vue'
import {setPageContext} from './usePageContext'
import "./index.css";

export {createApp}

function createApp(pageContext) {
  const {Page, pageProps} = pageContext
  const PageWithLayout = {
    render() {
      return h(Page, pageProps || {})
    },
  }

  const app = createSSRApp(PageWithLayout)

  // We make `pageContext` available from any Vue component
  setPageContext(app, pageContext)

  return app
}

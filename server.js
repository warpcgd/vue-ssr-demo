const Vue = require('vue')
const express = require('express')
const server = express()
const createRenderer = require('vue-server-renderer').createRenderer
const createApp = require('./dist/server-bundle').default

const renderer = createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8'),
})

server.use(express.static('dist'))
server.use('/dist', express.static('dist'))


server.get('*', (req, res) => {
  const context = {
    title: 'hello',
    meta: `
      <meta charset="utf8">
    `,
    url: req.url
  }

  createApp(context) // context 会被 createApp 添加一个 store 属性，renderToString 的时候 init store 会被注入到 html 页面中
  .then(app => {
    renderer.renderToString(app, context, (err, html) => {
      if (err) {
        if (err.code === 404) {
           res.status(404).end('Page not found')
         } else {
           res.status(500).end('Internal Server Error')
         }
         return
      }

      res.send(html)
    })
  })
  .catch(error => {
    res.status(404).end('Page not found')
  })
})

server.listen(8080, () => {
  console.log(`server started at localhost:8080`)
})

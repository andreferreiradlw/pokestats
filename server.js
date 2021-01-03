const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT || 3000

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    if (pathname === '/home') {
      app.render(req, res, '/', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(PORT, err => {
    if (err) throw err
    console.log(`> Server Started on ${PORT}`)
  })
})

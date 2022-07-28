const http = require('http')

const server = http.createServer((req,res) => {
    console.log(req.url,req.method,req.headers)

    res.setHeader('Content-Type','text/html')
    res.write(`<html>
    <header>My first Page</header>
    <body>Hello my NodeJs server</body>
    </html>`)
    res.end()
})

server.listen(3000)
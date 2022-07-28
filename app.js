const http = require('http')

const server = http.createServer((req,res) => {
    console.log(req.url,req.method,req.headers)
    const url = req.url
    if(url == '/'){
        res.write(`<html>
    <header></header>
    <body>
        <form action="/message" method="POST">
            <input type='text'>
            <button type='submit'>Send</button>
        </form>
    </body>
    </html>`)
    return res.end()
    }
    res.setHeader('Content-Type','text/html')
    res.write(`<html>
    <header>My first Page</header>
    <body>Hello my NodeJs server</body>
    </html>`)
    res.end()
})

server.listen(3000)
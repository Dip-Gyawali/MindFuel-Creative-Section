//if you want to download a package locally just type npm init which will create a package jason then download all necessary packages it will create a node_module folder
// if code is downloaded from git then node_module folder wont be there as ot takes a lot of space of after clone just hit npm install which will install all dependencies from package jason

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type

    res.setHeader('Content-Type', 'text/html');
    // res.write('<p>hiten server</p>');   
    // res.write('<p>hyrax server</p>');
    // res.end();

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;

        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-section':
            res.statusCode = 301;
            res.setHeader('Location' ,'/about');
            res.end();
            break;
        default:
            path += '404_error.html';
            res.statusCode = 404;
            break;
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        else {
            // res.write(data); 
            res.end(data);  //if only one response is needed then we can do this
        }
    })

})

server.listen(3000, 'localhost', () => {
    console.log("server is running on port 3000");
})
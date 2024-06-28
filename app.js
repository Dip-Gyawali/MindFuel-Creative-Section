const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoute =require('./routes/blogRoutes');

//express app
const app = express();

//connect to database wuing mongodb
const dbURI = 'mongodb+srv://hiten:hiten123@nodetuts.xi9hwoj.mongodb.net/node-tuts?retryWrites=true&w=majority'; // here %40 is used at hiten123 because @ is %40
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
// app.set('views','myView')   if the .ejs html files is on another folder than views


//listening for request doesnt neeed to write local host it automatically sets it
// app.listen(3000);

//middle ware created

// app.use((req,res,next)=>{
//   console.log("new request made : ");
//   console.log("host : ",req.hostname);
//   console.log("path : ",req.path);
//   console.log("method : ",req.method);
//   next();
// });

// app.use((req,res,next)=>{
//     console.log("next middleware : ");
//     next();
//   });

//middleware and static
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

//mongoose and mango sandbox routes
// app.get('/add-blog',(req,res)=>{
//     const blog=new Blog({
//         title:'new blog2',
//         snippet:'about my new blog',
//         body:'more about my new blog'
//     });

//     blog.save()
//      .then((result)=>{
//         res.send(result)
//      })
//      .catch((err)=>{
//         console.log(err);
//      });
// });

//to get all blogs
// app.get('/all-blog',(req,res)=>{
//     Blog.find()
//      .then((result)=>{
//         res.send(result);
//      })
//      .catch((err)=>{
//         console.log(err);
//      });
// });

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('667e449e6991938443f77c89')
//      .then((result)=>{
//         res.send(result);
//      })
//      .catch((err)=>{
//         console.log(err);
//      })
// })

app.get('/', (req, res) => {
    // res.send('<p>Hello </p>');
    // res.sendFile('./views/index.html',{root: __dirname});
    // const blogs=[
    //     {title : 'Heading 1', snippet: 'Lorem ipsum dolor sit amet'},
    //     {title : 'Heading 2', snippet: 'Lorem ipsum dolor sit amet'},
    //     {title : 'Heading 3', snippet: 'Lorem ipsum dolor sit amet'}
    // ]
    // res.render('index', {title : "Home", blogs});
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>Hello </p>');
    // res.sendFile('./views/about.html',{root: __dirname});
    res.render('about', { title: 'About' });
    
});

//blog routes
app.use('/blogs',blogRoute);

//redirect

// app.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// });

//404 error
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})
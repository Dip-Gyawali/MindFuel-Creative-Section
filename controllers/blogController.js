const Blog = require('../models/blog');

const blog_index= (req,res)=>{
    Blog.find().sort({ likes: -1 })
    .then((result) => {
        res.render('blogs/index', { title: "All Blogs", blogs:result })
    })
    .catch((err) => {
        console.log(err);
    });
}

const blog_detail=(req,res)=>{
    const id=req.params.id;   //to access the id of the blog
    Blog.findById(id)
     .then((result)=>{
        res.render('blogs/detail',{title: "Blogs Detail" ,blog:result})
     })
     .catch((err)=>{
        res.status(404).render('404', { title: '404' });
     });
}

const blog_create_get =(req,res)=>{
    res.render('blogs/create', { title: 'Create' });
}

const blog_create_post =(req,res)=>{
    const blog =new Blog(req.body);
    blog.save()
     .then((result)=>{
        res.redirect('/blogs');
     })
     .catch((err)=>{
        console.log(err);
     })
}

const blog_delete= (req,res)=>{
    const id =req.params.id;
    Blog.findByIdAndDelete(id)
     .then((result)=>{
        res.json({ redirect : '/blogs'});
     })
     .catch((err)=>{
        console.log(err);
    })
}

const blog_like = (req, res) => {
    const blogId = req.params.id;

    Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } }, { new: true })
        .then(updatedBlog => {
            res.json({ success: true, likes: updatedBlog.likes });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
}

module.exports={
    blog_index,
    blog_detail,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_like
}
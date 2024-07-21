const express = require('express');
const app = express();
const userModel = require('./models/user');
const path= require('path');


app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));


app.get('/' , function(req ,res){
    res.render('form');
});

app.post('/create' ,async function(req ,res){
    let createUser= await userModel.create({
        name : req.body.name,
        email: req.body.email,
        image : req.body.image 
    });
    res.redirect('/')
});

app.get('/read' , async function(req, res){
    let allUsers = await userModel.find() ;
    res.render('users' , {users : allUsers})
})

app.get('/delete/:id' , async function(req ,res){
    let deletedUser = await userModel.findOneAndDelete({_id : req.params.id});
    res.redirect('/read');
})
 
app.get('/edit/:id' , async function(req,res){
    let user = await userModel.findOne({_id : req.params.id})
    res.render('edit' , {user : user})
})
app.post('/update/:id' , async function(req,res){
        
        let {name , image , email} = req.body ;
        let user = await userModel.findOneAndUpdate({_id : req.params.id} , {image , name , email} , {new: true});
        res.redirect('/read');
    })


app.listen(3000);
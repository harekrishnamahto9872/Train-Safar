var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app,db){

    const collection = db.collection('loginDetails')
    const postsCollection = db.collection('postsDetails')

    app.get('/',function(req,res){
        console.log("home page requested ")
        res.render('index')
    })

    app.get('/login', function(req,res){
        console.log("login called for get")
        res.render('login',data={message:null})
    })

    app.get('/signup',function(req,res){
        console.log("signup called for get")
        res.render('signup',data={message:null})
    })
    
    app.get('/posts/:email', function(req,res){
        console.log("query param",req.params.email)
        postsCollection.find({}).toArray()
        .then(result => {
            console.log("posts result ",result)
            res.render('allPosts',data={email: req.params.email,posts: result})
        })
        .catch(err =>{
            res.send("Error fetching posts")
        })
    })

    app.get('/posts/myposts/:email',function(req,res){
        postsCollection.find({email:req.params.email}).toArray()
        .then(result => {
            console.log("posts result ",result)
            res.render('allPosts',data={email: req.params.email,posts: result})
        })
        .catch(err =>{
            res.send("Error fetching posts")
        })
    })

    app.post('/posts/:email',urlencodedParser,function(req,res){
        console.log("create post called with email : ",req.params.email)
        const request = req.body
        const email = request.email
        const title = request.title
        const content = request.content

        collection.findOne({"email": email})
        .then(user =>{

            const postObj = {
                email : email,
                title : title,
                content : content, 
                user : user.name
            }
    
            const postId = postsCollection.insertOne(postObj)
            .then(result =>{
                console.log("post created with id ", result.insertedId)
                
                
                // Finding a user with this email
                collection.findOne({"email": email})
                .then(user =>{
                     console.log("Previous array", user.posts)
                    
                     var postsList = user.posts
                     
                    // Adding the created post id to posts of user
                    postsList = [...postsList,result.insertedId]
    
                    //Updating the user's postslist with the added postId
                    collection.updateOne(
                        {"email": email},
                        {$set: {"posts":postsList}})
                        .then( response =>{
                            console.log("User's postsList updated ")
                    })
                    
                })
                
            })

        })
        .then(postRes =>{
            postsCollection.find({}).toArray()
            .then(result => {
                console.log("posts result ",result)
                res.render('allPosts',data={email: req.params.email,posts: result})
            })
            .catch(err =>{
                res.send("Error fetching posts")
            })
        })
        
        
        
    })

    // app.get('/posts',function(req,res){
    //     console.log("reqr",req)
    //     res.render('allPosts')
    // })

    app.post('/login',urlencodedParser,function(req,res){
        //res.render('todo',{todos:data})
        console.log("post for login called")
        var request = req.body
        const email = request.email
        const password = request.password

        collection.findOne({email: email})
        .then(user =>{
            if(user)
            {
                if(user.password === password){
                    console.log("user found with details ",user)
                    res.render('logged',data={name: user.name, email : user.email})
                }
                else{
                    console.log("please enter correct password")
                    res.render('login', data={message:"Please enter correct password"})
                }
            }
            else
            {
                console.log("Errr: user not found with the mentioned email id")
                res.render('signup', data={message:"Email id not registered with us.!! Please sign up"})
            }
        })
        .catch(err =>{
            console.error("error occured : ", err)
        })
    })

    app.post('/signup',urlencodedParser,function(req,res){
        console.log('post called for signup')

        var request = req.body
        const name = request.username
        const email = request.email
        const password = request.password
        const posts = []

        const newUser = {
            "name" : name,
            "email" : email,
            "password": password,
            "posts" : posts
        }

        collection.insertOne(newUser)
        .then(user => {
            console.log("User saved successfully ", user.insertedId)
            res.render('logged',data={name: name, email: user.email})
        })
        .catch(err =>{
            console.error("failed to insert user ", err)
            res.render('failure')
        })
    })

    // app.post('/posts',urlencodedParser, function(req,res){
    //     const request = req.body
    //     const title = request.title
    //     const content = request.content
    //     const postId

    // })

}
const {axios } = require('axios');
var express = require('express');
var router = express.Router();
require('dotenv').config();
var Post = require('../models/post');

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getPosts', async(req,res)=>{
  try {
    const posts = await Post.find({});
    res.json(posts);
    
  } catch (error) {
    res.json({message:error.message});
    console.log(error);
  }
})

router.get('/getpost/:id',async(req,res)=>{
  console.log(req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    res.json({message:error.message});
    console.log(error);
  }
})
router.post('/addword',async(req,res)=>{
  let word = req.body.value;
  let response = await axios.get(`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}`,
  {headers :{app_id: process.env.DICT_ID, app_key: process.env.DICT_KEY}}
  )
  .then(async (response)=>{
    console.log(response.data.id);
    let post = response.data.results[0].lexicalEntries;
    let word = response.data.id

      var newPost = new Post({
          post: post,
          _id:word
      });

    try {
      await newPost.save();
      res.json({message:"Added Successfully"})
    } catch (error) {
      res.status(500).json({message:"Something Went Wrong"})
    } 
  })
  .catch( (error)=> {
  console.log(error);
  res.status(500).json({message:"Something Went Wrong"});
})

})

module.exports = router;

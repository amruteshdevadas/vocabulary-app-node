const mongoose = require('mongoose')
const schema = mongoose.Schema;
const postSchema = new schema({
    post:{
        type:Array,
        required:true
    },
    _id: {
        type:String,
        required:true
    }
   
})

const Post = mongoose.model('Posts',postSchema,'posts')
module.exports= Post;
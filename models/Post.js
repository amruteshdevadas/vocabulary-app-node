const mongoose = require('mongoose')
const schema = mongoose.Schema;
const userSchema = new schema({
    post:{
        type:Array,
        required:true
    },
    _id: {
        type:String,
        required:true
    }
   
})

const Post = mongoose.model('Posts',userSchema,'posts')
module.exports= Post;
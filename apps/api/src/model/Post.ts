import * as mongoose from 'mongoose'



const reactions = new mongoose.Schema({
    likes: { type: Number },
    dislikes: { type: Number }
})

const postSchema = new mongoose.Schema({
    id : {type: Number},
    title: {type:String},
    body: {type:String},
    tags: {type:mongoose.Schema.Types.Array},
    reactions: {type:reactions},
   views: {type:Number},
})


const model = mongoose.model('Post',postSchema)
export {model}
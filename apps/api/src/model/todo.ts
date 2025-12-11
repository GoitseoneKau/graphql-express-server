import * as mongoose from 'mongoose'


const todoSchema = new mongoose.Schema({
    todo: {type:String},
    completed: {type:Boolean}
})


const model = mongoose.model('todo',todoSchema)
export {model}
import {  GraphQLSchema } from "graphql";
import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLList } from "graphql"
import { model as Post } from '../model/Post.js'
import {model as Todo} from '../model/todo.js'
import mutation from "../mutations/mutations.js";
import PostType from "../types/post.js";
import Todotype from "../types/todo.js";


// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //========= todo queries ==========
        // get all todos
        todos:{
            type:GraphQLList(Todotype),
            resolve:(parent,args)=>{
                return Todo.find().sort({_id:-1}).limit(10)
            }
        },
        // get a todo
         todo:{
            type:Todotype,
            args:{_id:{type:GraphQLID}},
            resolve:(parent,args)=>{
                // return Todo.findOne({_id:args._id})
                return Post.findById(args.id)
            }
        },
        //======== posts queries =========
        // get all posts
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find()
            }
        },
        // get a post
        post: {
            type: PostType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                // return posts.find(post => post.id === args.id)
                // return Post.find({id:args.id})
                // return Post.findById(args.id)
                return Post.findOne({ id: +args.id })
            }
        }
    }
});


const qlschema = new GraphQLSchema({
    query: RootQuery,
    mutation
})

export default qlschema
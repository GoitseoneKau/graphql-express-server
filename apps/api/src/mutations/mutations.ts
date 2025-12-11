import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLID, GraphQLInputObjectType } from "graphql"
import { model as Post } from '../model/Post.js'
import {model as Todo} from '../model/todo.js'
import  PostType  from "../types/post.js"
import  Todotype  from "../types/todo.js"


const reactionsInput = new GraphQLInputObjectType({
  name: 'reactions',
     fields: () => ({
        likes: { type: GraphQLInt },
        dislikes: { type: GraphQLInt }
    })
});

//Mutatons
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        
        // ====================== POST mutations =======================
         // add Post
        addPost: {
            type:PostType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                body: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // creating a new post from mongoose model
                // return Post.findOne().sort({ id: -1 }).then((post) => {
                //     maxId = post?.id
                //     maxId++;

                //     const new_post = new Post({
                //         id: maxId,
                //         title: args.title,
                //         body: args.body
                //     })

                //     return new_post.save()
                // })


                 const new_post = new Post({
                        title: args.title,
                        body: args.body
                    })

                    return new_post.save()


            }
        },
        // delete
        deletePost: {
            type: PostType,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                return Post.findOneAndDelete({ id: +args.id })
            }
        },
        // update
        updatePost: {
            type: PostType,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                views:{ type: GraphQLNonNull(GraphQLInt) },
                input : { type:reactionsInput }
            },
            async resolve(parent, args) {
                const {id,views,input} = args

                const post = await Post.findOne({id:id})
                   let _v = views + post!.views
                    let _likes =input.likes + post!.reactions!.likes 
                    let _dislikes = input.dislikes + post!.reactions!.dislikes
                
                
                return Post.findOneAndUpdate({id:id},{
                    $set:{
                        views: _v,
                        reactions:{
                            likes:_likes,
                            dislikes:_dislikes
                        }
                    },
                    new:true
                })
          
                
            }
        },

        // ====================== TODO mutations =======================
        // add todo
        addTodo: {
            type: Todotype,
            args: {
                todo: { type: GraphQLNonNull(GraphQLString) },
                completed: { type: GraphQLNonNull(GraphQLBoolean) },
            },
            resolve(parent, args) {
                // creating a new post from mongoose model
                return new Todo({todo: args.todo,completed: args.completed}).save()
            }
        },
        // delete todo
        deleteTodo: {
            type: Todotype,
            args: {
                _id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Todo.findOneAndDelete({ _id: args._id })
            }
        },
        // update todo
        updateTodo: {
            type: Todotype,
            args: {
                _id: { type: GraphQLNonNull(GraphQLID) },
                todo:{ type: GraphQLNonNull(GraphQLString) },
                completed : { type:GraphQLNonNull(GraphQLBoolean) }
            },
            async resolve(parent, args) {
                const {_id,todo,completed} = args
                
                return Todo.findOneAndUpdate({_id:_id},
                    {
                        todo,
                        completed
                    },
                    {new:true}
                )
          
                
            }
        }

    }
})


export default mutation;

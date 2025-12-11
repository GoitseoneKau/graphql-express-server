import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from "graphql";

// Todo Type
const Todotype = new GraphQLObjectType({
    name:"todo",
    fields:()=>({
        _id : {type:GraphQLID},
        id: {type:GraphQLID},
        todo: {type:GraphQLString},
       completed:{type:GraphQLBoolean}
    })
})

export default Todotype
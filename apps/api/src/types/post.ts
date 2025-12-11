import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from "graphql";


// Reactions Type
const ReactionType = new GraphQLObjectType({
    name: 'Reactions',
    fields: () => ({
        likes: { type: GraphQLInt },
        dislikes: { type: GraphQLInt }
    })
})

// Post Type
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        reactions: { type: ReactionType },
        views: { type: GraphQLInt },
        userId: { type: GraphQLInt }
    })
});

export default PostType
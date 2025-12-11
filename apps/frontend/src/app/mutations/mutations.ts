import {gql} from '@apollo/client'

// We use the gql tag to parse our query string into a query document

// get todos
const GET_TODOS = gql`
  query GetTodos {
    todos {
      _id
      todo
      completed
    }
  }
`;

// delete todo
const DELETE_TODO = gql`mutation deleteTodo($id:ID!){
  deleteTodo(_id:$id){
    _id
    todo
    completed
  }
}`;

// add todo
const ADD_TODO = gql`mutation addTodo($todo: String!, $completed: Boolean!){
  addTodo(todo: $todo, completed: $completed){
   _id
    todo
    completed
  }
}
`
// update todo
const UPDATE_TODO = gql`
mutation updateTodo($id: ID!, $todo: String!, $completed: Boolean!){
  updateTodo(_id: $id, todo: $todo, completed: $completed){
    _id
    todo
    completed
  }
}`;


export {GET_TODOS,ADD_TODO,DELETE_TODO,UPDATE_TODO}
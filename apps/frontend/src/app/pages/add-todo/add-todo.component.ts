import { Component, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ADD_TODO, GET_TODOS } from '../../mutations/mutations';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../../types/todo.type';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
  apollo = inject(Apollo)
  router = inject(Router)
  todo: Todo = { todo: "", completed: false };

  addTodo(form: NgForm) {
    const todo = form.value as Todo

    this.apollo
      .mutate<any>({
        mutation: ADD_TODO,
        variables: { todo: todo.todo, completed: todo.completed },
        update: (cache, { data }) => {
          const addedTodo = data.addTodo;
          
          if (!addedTodo) {
            console.log("not addedTodo");
            return
          }

          const { todos } = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS })!
          let newTodos = [...todos,addedTodo]
       
       
          cache.writeQuery({
            query: GET_TODOS,
            data: { todos: newTodos }
          })
        }
      }).subscribe((result) => {
        this.router.navigate([''])
      })

  }
}

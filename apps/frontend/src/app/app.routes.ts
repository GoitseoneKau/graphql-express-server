import { Routes } from '@angular/router';
import { AddTodoComponent } from './pages/add-todo/add-todo.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

export const routes: Routes = [
    {path:'',component:TodoListComponent},
    {path:'add',component:AddTodoComponent}
];

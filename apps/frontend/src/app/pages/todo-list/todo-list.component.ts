import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GET_TODOS,DELETE_TODO,UPDATE_TODO, ADD_TODO } from '../../mutations/mutations';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { Todo } from '../../types/todo.type';


@Component({
  selector: 'todo-list',
  imports: [ListItemComponent,FontAwesomeModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  // injections
  private apollo = inject(Apollo)
  private router = inject(Router)

  // icons
  plus_icon = faPlus
  
  // signals
  todos = signal<Todo[]>([])
  filterTodos = signal<Todo[]>([])
  loading = signal<boolean>(true);
  statusFilter = signal<boolean|null>(null);
  image =  signal(["assets/icons8-mongodb-100.png",
   "assets/icons8-express-js-100.png",
   "assets/icons8-angular-100.png",
   "assets/icons8-nodejs-480.png"
  ]);

  // subscription
  querySubscription:Subscription;


  constructor(){
    // set loading to true
    this.loading.set(true)
  
    // fetch todos
    this.querySubscription = this.apollo.query({query: GET_TODOS}).subscribe((data)=>{

      const d = data.data as Todo[] as any
      let todos = d.todos as Todo[]
      todos = [...todos].sort((a,b)=>b._id!.localeCompare(a._id!))

      // initialize todos and filterTodos signals
       this.todos.set(todos);
       this.filterTodos.set(todos);

      //  set loading to false
      this.loading.set(false)
    })
  }

  ngOnDestroy(){
    // unsubscribe to avoid memory leaks
    this.querySubscription.unsubscribe()
  }


  // methods
  
  // navigate to add todo page
  gotoAdd(){
    this.router.navigate(['/add'])
  }
  
  // delete todo
  deleteTodo(todo:Todo){
    this.apollo
    .mutate<Todo>({
      mutation:DELETE_TODO,
      variables:{id:todo._id},
      update(cache){
        
        const {todos} = cache.readQuery<{todos:Todo[]}>({query:GET_TODOS})!
        cache.writeQuery({
          query:GET_TODOS,
          data:{todos : todos.filter(t=>t._id !==todo._id)}
        })

      }
    }).subscribe(()=>{
      this.todos.update(values=>values.filter(value=>value._id !== todo._id))
      this.filterTodos.update(values=>values.filter(value=>value._id !== todo._id))
    })
    
  }

  // update todo
  updateTodo(todo:Todo){
    this.apollo
    .mutate<Todo>({
      mutation:UPDATE_TODO,
      variables:{id:todo._id,todo:todo.todo,completed:todo.completed},
      update: (cache, { data }) => {
          const updateTodo = data
          if(!updateTodo) return;

          const {todos} = cache.readQuery<{todos:Todo[]}>({query:GET_TODOS})!
          let updatedTodos = todos.map(todo=>todo._id==updateTodo._id ? {...todo,...updateTodo}:todo)

          cache.writeQuery({
            query:GET_TODOS,
            data:{todos : updatedTodos}
          })
        }
    }).subscribe((d)=>{
      this.todos.update(values=>
        values.map(value => value._id == todo._id ? {...value,...todo}: value))
        
      this.filterTodos.update(values=>
        values.map(value => value._id == todo._id ? {...value,...todo}: value))
    })
    
  }


  // filter todos
  filter(status?: boolean) {

    this.statusFilter.set(status??null)

    if(status==null){
      this.todos.set(this.filterTodos())
      return
    } 

    const filteredTodos = this.filterTodos().filter(todo=>todo.completed == status);

    this.todos.set(filteredTodos)
  }
}



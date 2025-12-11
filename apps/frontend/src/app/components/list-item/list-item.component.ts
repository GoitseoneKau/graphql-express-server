import { Component, input, model, output } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { Todo } from '../../types/todo.type';


@Component({
  selector: 'list-item',
  imports: [FontAwesomeModule,FormsModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  delete_icon = faTrash

 todo = model<Todo>()

 delete = output()
 update_completed = output<Todo>()


 checkTodo(){

    const n = {
      _id:this.todo()!._id,
      todo:this.todo()!.todo,
      completed:!this.todo()!.completed
    }
    this.todo.set(n)
  
  this.update_completed.emit(this.todo()!)
 }

 deleteTodo(){
  this.delete.emit()
 }

}

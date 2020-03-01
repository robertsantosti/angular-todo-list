import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Todo } from "src/models/todo.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = "Minhas Tarefas";
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])
      ]
    });
  }

  public add() {
    const title = this.form.controls["title"].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.clear();
  }

  private clear() {
    this.form.reset();
  }

  public remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  public markAsDone(todo: Todo) {
    todo.done = true;
  }

  public markAsUndone(todo: Todo) {
    todo.done = false;
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from './services/task';
import { Task } from './models/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks = signal<Task[]>([]);

  novaTarefa: Task = {
    titulo: '',
    descricao: '',
    completa: false
  };

  searchId: number | null = null;
  tarefaEncontrada = signal<Task | null>(null);
  erroBusca = signal<string>('');

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks.set(data),
      error: (err) => console.error('Erro ao carregar tarefas do Spring Boot:', err)
    });
  }

  onSubmit(): void {
    if (!this.novaTarefa.titulo.trim()) return;

    this.taskService.createTask(this.novaTarefa).subscribe({
      next: (tarefaCriada) =>{
        this.tasks.update((lista)=> [...lista, tarefaCriada]);

        this.novaTarefa = {titulo: '', descricao: '', completa: false};
      },
      error: (err) => console.error('Erro ao cadastrar tarefa: ', err)
      
    });
  }

  onDelete(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.update((lista) => lista.filter((t) => t.id !== id));
      },
    error: (err) => console.error('Erro ao excluir tarefa:', err)
    });
  }

  onToggleComplete(task: Task): void {
    if (!task.id) return;

  // Cria uma cópia da tarefa com o status invertido
    const tarefaAtualizada: Task = { ...task, completa: !task.completa };

    this.taskService.updateTask(task.id, tarefaAtualizada).subscribe({
      next: (resposta) => {
      // Atualiza o Signal substituindo a tarefa antiga pela nova na lista
        this.tasks.update((lista) =>
          lista.map((t) => (t.id === resposta.id ? resposta : t))
        );
      },
      error: (err) => console.error('Erro ao atualizar tarefa:', err)
    });
  }

   onSearchById(): void {
    if (!this.searchId) return;

    this.erroBusca.set('');
    this.tarefaEncontrada.set(null);
    this.taskService.getTaskById(this.searchId).subscribe({
      next: (task) => {
        this.tarefaEncontrada.set(task);
      },
      error: (err) => {
        this.erroBusca.set(`Tarefa #${this.searchId} não foi encontrada no banco de dados.`);
      }
    });
   }

   onLimparBusca(): void {
    this.searchId = null;
    this.tarefaEncontrada.set(null);
    this.erroBusca.set('');
    }
}


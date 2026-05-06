import { ChangeDetectionStrategy, Component, inject, OnInit,
  signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzService } from
    '../../../../core/services/quizz.service';

@Component({
  selector: 'app-quizz-list',
  imports: [],
  templateUrl: './quizz-list.html',
  styleUrl: './quizz-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizzList implements OnInit {
  private readonly _quizzService = inject(QuizzService);
  private readonly _router = inject(Router);

  protected quizzes = signal<any[]>([]);
  protected errorMessage = signal<string>('');

  async ngOnInit(): Promise<void> {
    try {
      this.quizzes.set(await this._quizzService.getAll());
    } catch {
      this.errorMessage.set('Erreur lors du chargement des quizz');
    }
  }

  goToPlay(id: number): void {
    this._router.navigate(['/quizz', id, 'play']);
  }
}

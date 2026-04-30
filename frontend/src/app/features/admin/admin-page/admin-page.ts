import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { QuizzService } from '../../../core/services/quizz.service';
import { ThemeService } from '../../../core/services/theme.service';
import { QuestionService } from '../../../core/services/question.service';
import { User } from '../../../core/models/user.interface';
import { Theme } from '../../../core/models/theme.interface';
import { QuestionData } from '../../../core/models/question.interface';

@Component({
  selector: 'app-admin-page',
  imports: [],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPage implements OnInit {
  private readonly _userService = inject(UserService);
  private readonly _quizzService = inject(QuizzService);
  private readonly _themeService = inject(ThemeService);
  private readonly _questionService = inject(QuestionService);

  protected activeTab = signal<'users' | 'quizz' | 'themes' | 'questions'>('users');
  protected users = signal<User[]>([]);
  protected quizzes = signal<any[]>([]);
  protected themes = signal<Theme[]>([]);
  protected questions = signal<QuestionData[]>([]);

  async ngOnInit(): Promise<void> {
    await this.loadAll();
  }

  private async loadAll(): Promise<void> {
    try {
      this.users.set(await this._userService.getAll());
      this.quizzes.set(await this._quizzService.getAll());
      this.themes.set(await this._themeService.getAll());
      this.questions.set(await this._questionService.getAll());
    } catch {
      console.error('Erreur lors du chargement des données');
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await this._userService.delete(id);
      this.users.update((list) => list.filter((u) => u.id !== id));
    } catch {
      console.error('Erreur lors de la suppression');
    }
  }

  async deleteQuizz(id: number): Promise<void> {
    try {
      await this._quizzService.delete(id);
      this.quizzes.update((list) => list.filter((q) => q.id !== id));
    } catch {
      console.error('Erreur lors de la suppression');
    }
  }

  async deleteTheme(id: number): Promise<void> {
    try {
      await this._themeService.delete(id);
      this.themes.update((list) => list.filter((t) => t.id !== id));
    } catch {
      console.error('Erreur lors de la suppression');
    }
  }

  async deleteQuestion(id: number): Promise<void> {
    try {
      await this._questionService.delete(id);
      this.questions.update((list) => list.filter((q) => q.id !== id));
    } catch {
      console.error('Erreur lors de la suppression');
    }
  }
}

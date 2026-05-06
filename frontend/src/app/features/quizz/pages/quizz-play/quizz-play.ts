import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from '../../../../core/services/quizz.service';

type Phase = 'loading' | 'playing' | 'results';

@Component({
  selector: 'app-quizz-play',
  imports: [],
  templateUrl: './quizz-play.html',
  styleUrl: './quizz-play.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizzPlay implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _quizzService = inject(QuizzService);

  quiz = signal<any>(null);
  phase = signal<Phase>('loading');
  currentIndex = signal(0);
  selectedAnswerId = signal<number | null>(null);
  userAnswers = signal<{ questionId: number; answerId: number; correct: boolean }[]>([]);

  currentQuestion = computed(() => this.quiz()?.questions[this.currentIndex()] ?? null);
  isAnswered = computed(() => this.selectedAnswerId() !== null);
  isLastQuestion = computed(() => this.currentIndex() === (this.quiz()?.questions?.length ?? 1) - 1);
  score = computed(() => this.userAnswers().filter((a) => a.correct).length);

  async ngOnInit(): Promise<void> {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    const quiz = await this._quizzService.getById(id);
    this.quiz.set(quiz);
    this.phase.set('playing');
  }

  selectAnswer(answerId: number): void {
    if (this.isAnswered()) return;

    const question = this.currentQuestion();
    const correct = answerId === question.correct_answer.id;
    this.selectedAnswerId.set(answerId);
    this.userAnswers.update((prev) => [...prev, { questionId: question.id, answerId, correct }]);

    setTimeout(() => this.nextQuestion(), 1500);
  }

  nextQuestion(): void {
    if (this.isLastQuestion()) {
      this.phase.set('results');
    } else {
      this.currentIndex.update((i) => i + 1);
      this.selectedAnswerId.set(null);
    }
  }

  getAnswerState(answerId: number): 'default' | 'correct' | 'wrong' | 'missed' {
    if (!this.isAnswered()) return 'default';
    const correctId = this.currentQuestion().correct_answer.id;
    if (answerId === correctId) return 'correct';
    if (answerId === this.selectedAnswerId()) return 'wrong';
    return 'missed';
  }

  getAnswerForQuestion(questionId: number): { correct: boolean } | undefined {
    return this.userAnswers().find((a) => a.questionId === questionId);
  }

  restart(): void {
    this._router.navigate(['/quizz']);
  }
}
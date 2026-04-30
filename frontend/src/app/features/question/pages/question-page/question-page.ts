import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionService } from '../../../../core/services/question.service';
import { AuthService } from '../../../../core/services/auth.service';
import { QuestionData } from '../../../../core/models/question.interface';
import { FormsErrorDisplay } from '../../../../components/forms-error-display/forms-error-display';

@Component({
  selector: 'app-question-page',
  imports: [FormsErrorDisplay, ReactiveFormsModule],
  templateUrl: './question-page.html',
  styleUrl: './question-page.css',
})
export class QuestionPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _questionService = inject(QuestionService);
  private readonly _authService = inject(AuthService);

  isAdmin = this._authService.isAdmin;
  isConnected = this._authService.isConnected;
  questions = signal<Array<QuestionData>>([]);

  async ngOnInit(): Promise<void> {
    const data = await this._questionService.getAll();
    this.questions.set(data);
  }

  theme_id = new FormControl<number | null>(null, [Validators.required]);
  question = new FormControl<string>('', [Validators.required]);
  correct_answer_id = new FormControl<number | null>(null, [Validators.required]);

  formQuestion = this._fb.group({
    theme_id: this.theme_id,
    question: this.question,
    correct_answer_id: this.correct_answer_id,
  });

  async onSubmitNewQuestion() {
    if (this.formQuestion.valid) {
      const created = await this._questionService.create({
        question: this.formQuestion.value.question!,
        theme_id: this.formQuestion.value.theme_id!,
        correct_answer_id: this.formQuestion.value.correct_answer_id!,
      });
      this.questions.update(q => [...q, created]);
      this.formQuestion.reset();
    }
  }
}

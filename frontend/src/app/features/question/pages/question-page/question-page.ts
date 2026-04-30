import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../../core/services/question.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Question, QuestionData } from '../../../../core/models/question.interface';
import { Theme } from '../../../../core/models/theme.interface';
import { FormsErrorDisplay } from '../../../../components/forms-error-display/forms-error-display';

@Component({
  selector: 'app-question-page',
  imports: [FormsErrorDisplay, ReactiveFormsModule],
  templateUrl: './question-page.html',
  styleUrl: './question-page.css',
})
export class QuestionPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _questionService = inject(QuestionService);

  private readonly _route = inject(ActivatedRoute);
  private readonly _authService = inject(AuthService);
  isAdmin = this._authService.isAdmin;
  isConnected = this._authService.isConnected;

  questions = signal<Array<QuestionData>>([]);

  async ngOnInit(): Promise<void> {
    const data = await this._questionService.getAll();
    this.questions.set(data);
  }

  //=============================================================

  id = new FormControl<number>(1, [Validators.required]);
  theme = new FormControl<Theme | null>(null, [Validators.required]);
  question = new FormControl<string>('', [Validators.required]);
  correct_answer_id = new FormControl<number>(1, [Validators.required]);

  //==============================================================
  formQuestion = this._fb.group({
    id: this.id,
    theme: this.theme,
    question: this.question,
    correct_answer_id: this.correct_answer_id,
  });
  //==============================================================

  onSubmitNewQuestion() {
    if (this.formQuestion.valid) {
      console.log(this.formQuestion.value);

      const data: QuestionData = {
        id: this.formQuestion.value.id!,
        theme: this.formQuestion.value.theme!,
        question: this.formQuestion.value.question!,
        correct_answer_id: this.formQuestion.value.correct_answer_id!,
      };
    }
  }
}

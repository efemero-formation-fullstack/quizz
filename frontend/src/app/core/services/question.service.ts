import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserRole } from '../enums/user-role.enum';
import { Question, QuestionData } from '../models/question.interface';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private readonly _htttpClient = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  private _authToken = signal<string>('');
  authToken = this._authToken.asReadonly();
  private _role = signal<UserRole | null>(null);
  role = this._role.asReadonly();

  async getQuestionById(id: number): Promise<QuestionData> {
    const response = await firstValueFrom(
      this._htttpClient.get<{ data: QuestionData }>(this._apiUrl + '/question/' + id),
    );
    return response.data;
  }

  async getAll(): Promise<Array<QuestionData>> {
    const response = await firstValueFrom(
      this._htttpClient.get<{ data: Array<QuestionData> }>(this._apiUrl + '/question'),
    );
    return response.data;
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { QuestionData } from '../models/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  async getAll(): Promise<QuestionData[]> {
    const response = await firstValueFrom(
      this._httpClient.get<{ data: QuestionData[] }>(this._apiUrl + '/question'),
    );
    return response.data;
  }

  async getById(id: number): Promise<QuestionData> {
    const response = await firstValueFrom(
      this._httpClient.get<{ data: QuestionData }>(this._apiUrl + '/question/' + id),
    );
    return response.data;
  }

  async create(data: { question: string; theme_id: number; correct_answer_id: number }): Promise<QuestionData> {
    const response = await firstValueFrom(
      this._httpClient.post<{ data: QuestionData }>(this._apiUrl + '/question', data),
    );
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this._httpClient.delete(this._apiUrl + '/question/' + id));
  }
}
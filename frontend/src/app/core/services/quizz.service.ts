import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  async getById(id: number): Promise<any> {
    const response = await firstValueFrom(
      this._httpClient.get<{ data: any }>(this._apiUrl + '/quizz/' + id),
    );
    return response.data;
  }

  async getAll(): Promise<any[]> {
    const response = await firstValueFrom(
      this._httpClient.get<{ data: any[] }>(this._apiUrl + '/quizz'),
    );
    return response.data;
  }

  async create(data: { title: string; imgUrl: string; themeIds: number[] }): Promise<any> {
    const response = await firstValueFrom(
      this._httpClient.post<{ data: any }>(this._apiUrl + '/quizz', data),
    );
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this._httpClient.delete(this._apiUrl + '/quizz/' + id));
  }
}
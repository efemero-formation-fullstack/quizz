import { inject, Injectable, signal } from '@angular/core';
import { UserRole } from '../enums/user-role.enum';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Answer } from '../models/answer.interface';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  private _authToken = signal<string>('');
  authToken = this._authToken.asReadonly();
  private _role = signal<UserRole | null>(null);
  role = this._role.asReadonly();

  //get les infos d'un tournoi

  async getAnswerById(id: number): Promise<Answer> {
    //console.log(id);
    const response = await firstValueFrom(
      this._httpClient.get<{ data: Answer }>(this._apiUrl + '/answer/' + id),
    );
    return response.data;
  }

  async getAll(): Promise<Array<Answer>> {
    const response = await firstValueFrom(
      this._httpClient.get<{ data: Array<Answer> }>(this._apiUrl + '/answer'),
    );
    return response.data;
  }
}

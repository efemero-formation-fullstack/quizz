import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  async getAll(): Promise<User[]> {
    const response = await firstValueFrom(
      this._httpClient.get<{ data: User[] }>(this._apiUrl + '/user'),
    );
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this._httpClient.delete(this._apiUrl + '/user/' + id));
  }
}


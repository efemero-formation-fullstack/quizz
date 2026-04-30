import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Theme } from '../models/theme.interface';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl;

  async getAll(): Promise<Theme[]> {
    const response = await firstValueFrom(
      this._httpClient.get<{ data: Theme[] }>(this._apiUrl + '/theme'),
    );
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this._httpClient.delete(this._apiUrl + '/theme/' + id));
  }
}

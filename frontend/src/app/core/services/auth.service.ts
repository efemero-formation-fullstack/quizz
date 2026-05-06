import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UserRole } from '../enums/user-role.enum';
import { JwtDecoded, LoginData, LoginResponse, RegisterData } from '../models/auth.interface';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiURL = environment.apiUrl;

  private _authToken = signal<string>('');
  authToken = this._authToken.asReadonly();
  private _role = signal<UserRole | null>(null);
  role = this._role.asReadonly();
  private _userId = signal<number | null>(null);
  userId = this._userId.asReadonly();

  isAdmin = computed(() => this.role() === UserRole.ADMIN);
  isConnected = computed(() => !!this.authToken());

  constructor() {
    effect(() => {
      const token = this._authToken();
      if (!token) {
        localStorage.removeItem('token');
        this._role.set(null);
        return;
      }
      localStorage.setItem('token', token);
      const decoded = jwtDecode<JwtDecoded>(token);
      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        this._role.set(decoded.role as UserRole);
        this._userId.set(decoded.id);
      } else {
        this._authToken.set('');
      }
    });

    const localToken = localStorage.getItem('token');
    if (localToken) {
      this._authToken.set(localToken);
    }
  }

  async login(data: LoginData): Promise<void> {
    const response = await firstValueFrom(
      this._httpClient.post<LoginResponse>(this._apiURL + '/auth/login', data),
    );
    const decoded = jwtDecode<JwtDecoded>(response.token);
    this._role.set(decoded.role as UserRole);
    this._userId.set(decoded.id);
    this._authToken.set(response.token);
  }

  async register(data: RegisterData): Promise<void> {
    await firstValueFrom(this._httpClient.post(this._apiURL + '/auth/register', data));
  }

  logout(): void {
    this._authToken.set('');
  }
}

import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { QuizzService } from '../../../../core/services/quizz.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { Theme } from '../../../../core/models/theme.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-quizz-create',
  imports: [ReactiveFormsModule],
  templateUrl: './quizz-create.html',
  styleUrl: './quizz-create.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizzCreate implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _http = inject(HttpClient);
  private readonly _quizzService = inject(QuizzService);
  private readonly _themeService = inject(ThemeService);
  private readonly _router = inject(Router);
  private readonly _apiUrl = environment.apiUrl;

  protected themes = signal<Theme[]>([]);
  protected errorMessage = signal<string>('');

  protected title = new FormControl<string>('', [Validators.required]);
  protected imgUrl = new FormControl<string>('', [Validators.required]);
  protected themeIds = new FormControl<number[]>([], [Validators.required]);

  protected form = this._fb.group({
    title: this.title,
    imgUrl: this.imgUrl,
    themeIds: this.themeIds,
  });

  async ngOnInit(): Promise<void> {
    try {
      this.themes.set(await this._themeService.getAll());
    } catch {
      this.errorMessage.set('Erreur lors du chargement des thèmes');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    try {
      await this._quizzService.create({
        title: this.title.value!,
        imgUrl: this.imgUrl.value!,
        themeIds: this.themeIds.value!,
      });
      await this._router.navigate(['/dashboard']);
    } catch {
      this.errorMessage.set('Erreur lors de la création du quiz');
    }
  }

  async onFileUpload(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await firstValueFrom(
        this._http.post<{ url: string }>(this._apiUrl + '/upload', formData),
      );
      this.imgUrl.setValue(response.url);
    } catch {
      this.errorMessage.set("Erreur lors de l'upload de l'image");
    }
  }

  onThemeChange(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.themeIds.value ?? [];
    if (checked) {
      this.themeIds.setValue([...current, id]);
    } else {
      this.themeIds.setValue(current.filter((i) => i !== id));
    }
  }
}

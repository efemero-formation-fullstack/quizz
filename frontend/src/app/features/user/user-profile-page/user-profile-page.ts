import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.interface';
import authRoutes from '../../auth/auth.routes';

@Component({
  selector: 'app-user-profile-page',
  imports: [DatePipe, FormsModule],
  templateUrl: './user-profile-page.html',
  styleUrl: './user-profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilePage implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _authService = inject(AuthService);
  private readonly _userService = inject(UserService);

  protected user = signal<User | null>(null);
  protected isOwnProfile = signal(false);
  protected isAdmin = signal(false);
  protected friendEmail = signal('');
  protected error = signal('');

  async ngOnInit(): Promise<void> {
    try {
      const idParam = this._route.snapshot.paramMap.get('id');
      const id = idParam ? +idParam : this._authService.userId()!;
      this.isOwnProfile.set(!idParam);
      this.isAdmin.set(this._authService.isAdmin());
      this.user.set(await this._userService.getById(id));
    } catch {
      console.error('Erreur lors du chargement du profil');
    }
  }

  async addFriend(): Promise<void> {
    const email = this.friendEmail().trim();
    if (!email) return;
    try {
      this.error.set('');
      const updated = await this._userService.addFriend(email);
      this.user.set(updated);
      this.friendEmail.set('');
    } catch (err: unknown) {
      const message = (err as { error?: { message?: string } })?.error?.message;
      this.error.set(message ?? "Impossible d'ajouter cet ami.");
    }
  }

  async removeFriend(friendId: number): Promise<void> {
    try {
      this.error.set('');
      const updated = await this._userService.removeFriend(friendId);
      this.user.set(updated);
    } catch {
      this.error.set('Impossible de supprimer cet ami.');
    }
  }
}

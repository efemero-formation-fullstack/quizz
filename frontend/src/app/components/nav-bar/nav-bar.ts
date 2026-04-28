import { Component, inject } from '@angular/core';
import { UserRole } from '../../core/enums/user-role.enum';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  protected readonly UserRole = UserRole;
  private readonly _authservice = inject(AuthService);

  isAdmin = this._authservice.isAdmin;
  isConnected = this._authservice.isConnected;

  onLogoutBtn() {
    this._authservice.logout();
  }
}

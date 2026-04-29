import { Component } from '@angular/core';
import { NavBar } from '../nav-bar/nav-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NavBar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}

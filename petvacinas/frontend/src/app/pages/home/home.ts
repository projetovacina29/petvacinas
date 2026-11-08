import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {}

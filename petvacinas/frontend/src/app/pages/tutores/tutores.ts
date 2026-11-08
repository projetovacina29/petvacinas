
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { TutorService, Tutor } from '../../services/tutor';

@Component({
  selector: 'app-tutores',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './tutores.html',
  styleUrl: './tutores.scss'
})
export class Tutores implements OnInit {

  tutores: Tutor[] = [];

  tutor: Tutor = {
    nome: '',
    telefone: ''
  };

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.tutorService.listar().subscribe({
      next: (dados) => this.tutores = dados,
      error: (erro) => console.error('Erro ao listar tutores:', erro)
    });
  }

  cadastrar(): void {
    this.tutorService.cadastrar(this.tutor).subscribe({
      next: () => {
        alert('Tutor cadastrado com sucesso!');
        this.tutor = { nome: '', telefone: '' };
        this.listar();
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao cadastrar tutor.');
      }
    });
  }
}
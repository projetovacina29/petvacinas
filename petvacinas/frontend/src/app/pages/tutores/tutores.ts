
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
    RouterLink,
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

  editando: boolean = false;
  idEditando: number = 0;

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
        this.limparFormulario();
        this.listar();
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao cadastrar tutor.');
      }
    });
  }

  editar(tutor: Tutor): void {
    this.tutor = {
      nome: tutor.nome,
      telefone: tutor.telefone
    };

    this.idEditando = tutor.id!;
    this.editando = true;
  }

  atualizar(): void {
    this.tutorService.atualizar(this.idEditando, this.tutor).subscribe({
      next: () => {
        alert('Tutor atualizado com sucesso!');
        this.limparFormulario();
        this.listar();
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao atualizar tutor.');
      }
    });
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este tutor?')) {
      this.tutorService.excluir(id).subscribe({
        next: () => {
          alert('Tutor excluído com sucesso!');
          this.listar();
        },
        error: (erro) => {
          console.error(erro);
          alert('Erro ao excluir tutor.');
        }
      });
    }
  }

  limparFormulario(): void {
    this.tutor = { nome: '', telefone: '' };
    this.editando = false;
    this.idEditando = 0;
  }
}

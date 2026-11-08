
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

import { VacinaService, Vacina } from '../../services/vacina';

@Component({
  selector: 'app-vacinas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './vacinas.html',
  styleUrl: './vacinas.scss'
})
export class Vacinas implements OnInit {

  vacinas: Vacina[] = [];

  pesquisa = '';
  mostrarFormulario = false;
  editandoId: number | null = null;

  novaVacina: Vacina = {
    nome: '',
    descricao: ''
  };

  constructor(private vacinaService: VacinaService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.vacinaService.listar().subscribe({
      next: dados => this.vacinas = dados,
      error: erro => console.error('Erro ao listar vacinas:', erro)
    });
  }

  get vacinasFiltradas(): Vacina[] {
    const termo = this.pesquisa.toLowerCase();

    return this.vacinas.filter(v =>
      v.nome.toLowerCase().includes(termo) ||
      v.descricao.toLowerCase().includes(termo)
    );
  }

  salvarVacina(): void {
    if (!this.novaVacina.nome || !this.novaVacina.descricao) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    if (this.editandoId !== null) {
      this.vacinaService.atualizar(this.editandoId, this.novaVacina).subscribe({
        next: () => {
          alert('Vacina atualizada com sucesso!');
          this.cancelarFormulario();
          this.listar();
        },
        error: erro => {
          console.error(erro);
          alert('Erro ao atualizar vacina.');
        }
      });
    } else {
      this.vacinaService.cadastrar(this.novaVacina).subscribe({
        next: () => {
          alert('Vacina cadastrada com sucesso!');
          this.cancelarFormulario();
          this.listar();
        },
        error: erro => {
          console.error(erro);
          alert('Erro ao cadastrar vacina.');
        }
      });
    }
  }

  editarVacina(vacina: Vacina): void {
    this.novaVacina = {
      nome: vacina.nome,
      descricao: vacina.descricao
    };

    this.editandoId = vacina.id!;
    this.mostrarFormulario = true;
  }

  excluirVacina(id: number): void {
    if (confirm('Deseja realmente excluir esta vacina?')) {
      this.vacinaService.excluir(id).subscribe({
        next: () => {
          alert('Vacina excluída com sucesso!');
          this.listar();
        },
        error: erro => {
          console.error(erro);
          alert('Erro ao excluir vacina.');
        }
      });
    }
  }

  cancelarFormulario(): void {
    this.novaVacina = {
      nome: '',
      descricao: ''
    };

    this.editandoId = null;
    this.mostrarFormulario = false;
  }
}

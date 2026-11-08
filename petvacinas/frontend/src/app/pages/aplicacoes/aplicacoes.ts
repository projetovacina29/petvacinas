
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

import { AplicacaoService, Aplicacao } from '../../services/aplicacao';
import { PetService, Pet } from '../../services/pet';
import { VacinaService, Vacina } from '../../services/vacina';

@Component({
  selector: 'app-aplicacoes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './aplicacoes.html',
  styleUrl: './aplicacoes.scss'
})
export class Aplicacoes implements OnInit {

  aplicacoes: Aplicacao[] = [];
  pets: Pet[] = [];
  vacinas: Vacina[] = [];

  mostrarFormulario = false;
  editandoId: number | null = null;

  novaAplicacao = {
    petId: null as number | null,
    vacinaId: null as number | null,
    dataAplicacao: '',
    proximaDose: ''
  };

  constructor(
    private aplicacaoService: AplicacaoService,
    private petService: PetService,
    private vacinaService: VacinaService
  ) {}

  ngOnInit(): void {
    this.listar();
    this.listarPets();
    this.listarVacinas();
  }

  listar(): void {
    this.aplicacaoService.listar().subscribe({
      next: dados => this.aplicacoes = dados,
      error: erro => console.error('Erro ao listar aplicações:', erro)
    });
  }

  listarPets(): void {
    this.petService.listar().subscribe({
      next: dados => this.pets = dados,
      error: erro => console.error('Erro ao listar pets:', erro)
    });
  }

  listarVacinas(): void {
    this.vacinaService.listar().subscribe({
      next: dados => this.vacinas = dados,
      error: erro => console.error('Erro ao listar vacinas:', erro)
    });
  }

  salvarAplicacao(): void {
    if (
      !this.novaAplicacao.petId ||
      !this.novaAplicacao.vacinaId ||
      !this.novaAplicacao.dataAplicacao
    ) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    const aplicacao: Aplicacao = {
      dataAplicacao: this.novaAplicacao.dataAplicacao,
      proximaDose: this.novaAplicacao.proximaDose,
      pet: { id: this.novaAplicacao.petId },
      vacina: { id: this.novaAplicacao.vacinaId }
    };

    if (this.editandoId !== null) {
      this.aplicacaoService.atualizar(this.editandoId, aplicacao).subscribe({
        next: () => {
          alert('Aplicação atualizada com sucesso!');
          this.cancelarFormulario();
          this.listar();
        },
        error: erro => {
          console.error(erro);
          alert('Erro ao atualizar aplicação.');
        }
      });
    } else {
      this.aplicacaoService.cadastrar(aplicacao).subscribe({
        next: () => {
          alert('Aplicação cadastrada com sucesso!');
          this.cancelarFormulario();
          this.listar();
        },
        error: erro => {
          console.error(erro);
          alert('Erro ao cadastrar aplicação.');
        }
      });
    }
  }

  editarAplicacao(item: Aplicacao): void {
    this.novaAplicacao = {
      petId: item.pet.id,
      vacinaId: item.vacina.id,
      dataAplicacao: item.dataAplicacao,
      proximaDose: item.proximaDose || ''
    };

    this.editandoId = item.id!;
    this.mostrarFormulario = true;
  }

  excluirAplicacao(id: number): void {
    if (confirm('Deseja excluir esta aplicação?')) {
      this.aplicacaoService.excluir(id).subscribe({
        next: () => {
          alert('Aplicação excluída com sucesso!');
          this.listar();
        },
        error: erro => {
          console.error(erro);
          alert('Erro ao excluir aplicação.');
        }
      });
    }
  }

  cancelarFormulario(): void {
    this.novaAplicacao = {
      petId: null,
      vacinaId: null,
      dataAplicacao: '',
      proximaDose: ''
    };

    this.editandoId = null;
    this.mostrarFormulario = false;
  }
}

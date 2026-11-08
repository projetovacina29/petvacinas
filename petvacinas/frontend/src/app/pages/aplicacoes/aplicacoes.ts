
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

interface Aplicacao {
  id: number;
  pet: string;
  vacina: string;
  dataAplicacao: string;
  proximaDose: string;
}

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
    RouterLink
  ],
  templateUrl: './aplicacoes.html',
  styleUrl: './aplicacoes.scss'
})
export class Aplicacoes {
  aplicacoes: Aplicacao[] = [];

  mostrarFormulario = false;
  editandoId: number | null = null;

  novaAplicacao: Aplicacao = this.formularioVazio();

  formularioVazio(): Aplicacao {
    return {
      id: 0,
      pet: '',
      vacina: '',
      dataAplicacao: '',
      proximaDose: ''
    };
  }

  salvarAplicacao(): void {
    if (
      !this.novaAplicacao.pet ||
      !this.novaAplicacao.vacina ||
      !this.novaAplicacao.dataAplicacao
    ) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    if (this.editandoId !== null) {
      const indice = this.aplicacoes.findIndex(
        item => item.id === this.editandoId
      );

      if (indice !== -1) {
        this.aplicacoes[indice] = { ...this.novaAplicacao };
      }
    } else {
      this.aplicacoes.push({
        ...this.novaAplicacao,
        id: Date.now()
      });
    }

    this.cancelarFormulario();
  }

  editarAplicacao(item: Aplicacao): void {
    this.novaAplicacao = { ...item };
    this.editandoId = item.id;
    this.mostrarFormulario = true;
  }

  excluirAplicacao(id: number): void {
    if (confirm('Deseja excluir esta aplicação?')) {
      this.aplicacoes = this.aplicacoes.filter(
        item => item.id !== id
      );
    }
  }

  cancelarFormulario(): void {
    this.novaAplicacao = this.formularioVazio();
    this.editandoId = null;
    this.mostrarFormulario = false;
  }
}

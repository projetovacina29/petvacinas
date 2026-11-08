import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

interface Vacina {
  id: number;
  pet: string;
  nome: string;
  aplicacao: string;
  proximaDose: string;
}

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
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './vacinas.html',
  styleUrl: './vacinas.scss'
})
export class Vacinas {

  vacinas: Vacina[] = [];

  pesquisa = '';
  mostrarFormulario = false;
  editandoId: number | null = null;

  novaVacina: Vacina = this.formularioVazio();

  formularioVazio(): Vacina {
    return {
      id: 0,
      pet: '',
      nome: '',
      aplicacao: '',
      proximaDose: ''
    };
  }

  get vacinasFiltradas(): Vacina[] {
    const termo = this.pesquisa.toLowerCase();

    return this.vacinas.filter(v =>
      v.pet.toLowerCase().includes(termo) ||
      v.nome.toLowerCase().includes(termo)
    );
  }

  get totalEmDia(): number {
  return this.vacinas.filter(v => this.statusVacina(v) === 'Em dia').length;
}

get totalAtrasadas(): number {
  return this.vacinas.filter(v => this.statusVacina(v) === 'Atrasada').length;
}

  salvarVacina(): void {
    if (
      !this.novaVacina.pet ||
      !this.novaVacina.nome ||
      !this.novaVacina.aplicacao
    ) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    if (this.editandoId !== null) {
      const indice = this.vacinas.findIndex(
        v => v.id === this.editandoId
      );

      if (indice !== -1) {
        this.vacinas[indice] = { ...this.novaVacina };
      }
    } else {
      this.vacinas.push({
        ...this.novaVacina,
        id: Date.now()
      });
    }

    this.cancelarFormulario();
  }

  editarVacina(vacina: Vacina): void {
    this.novaVacina = { ...vacina };
    this.editandoId = vacina.id;
    this.mostrarFormulario = true;
  }

  excluirVacina(id: number): void {
    if (confirm('Deseja realmente excluir esta vacina?')) {
      this.vacinas = this.vacinas.filter(v => v.id !== id);
    }
  }

  cancelarFormulario(): void {
    this.novaVacina = this.formularioVazio();
    this.editandoId = null;
    this.mostrarFormulario = false;
  }

  statusVacina(vacina: Vacina): string {
    if (!vacina.proximaDose) return 'Sem próxima dose';

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const data = new Date(vacina.proximaDose + 'T00:00:00');

    if (data < hoje) return 'Atrasada';
    if (data.getTime() === hoje.getTime()) return 'Vence hoje';

    return 'Em dia';
  }
}
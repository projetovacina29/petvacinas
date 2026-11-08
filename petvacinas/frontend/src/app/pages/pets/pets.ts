import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

interface Pet {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  tutor: string;
}

@Component({
  selector: 'app-pets',
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
  templateUrl: './pets.html',
  styleUrl: './pets.scss'
})
export class Pets {

  pets: Pet[] = [];

  pesquisa = '';
  mostrarFormulario = false;
  editandoId: number | null = null;

  novoPet: Pet = this.formularioVazio();

  formularioVazio(): Pet {
    return {
      id: 0,
      nome: '',
      especie: '',
      raca: '',
      idade: 0,
      tutor: ''
    };
  }

  get petsFiltrados(): Pet[] {
    const termo = this.pesquisa.toLowerCase();

    return this.pets.filter(pet =>
      pet.nome.toLowerCase().includes(termo) ||
      pet.tutor.toLowerCase().includes(termo)
    );
  }

  salvarPet(): void {
    if (
      !this.novoPet.nome ||
      !this.novoPet.especie ||
      !this.novoPet.tutor
    ) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    if (this.editandoId !== null) {
      const indice = this.pets.findIndex(
        pet => pet.id === this.editandoId
      );

      if (indice !== -1) {
        this.pets[indice] = { ...this.novoPet };
      }
    } else {
      this.pets.push({
        ...this.novoPet,
        id: Date.now()
      });
    }

    this.cancelarFormulario();
  }

  editarPet(pet: Pet): void {
    this.novoPet = { ...pet };
    this.editandoId = pet.id;
    this.mostrarFormulario = true;
  }

  excluirPet(id: number): void {
    if (confirm('Deseja realmente excluir este pet?')) {
      this.pets = this.pets.filter(pet => pet.id !== id);
    }
  }

  cancelarFormulario(): void {
    this.novoPet = this.formularioVazio();
    this.editandoId = null;
    this.mostrarFormulario = false;
  }
}
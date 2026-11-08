
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

import { PetService, Pet } from '../../services/pet';
import { TutorService, Tutor } from '../../services/tutor';

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
export class Pets implements OnInit {

  pets: Pet[] = [];
  tutores: Tutor[] = [];

  pesquisa = '';
  mostrarFormulario = false;
  editandoId: number | null = null;

  novoPet = {
    nome: '',
    especie: '',
    raca: '',
    tutorId: null as number | null
  };

  constructor(
    private petService: PetService,
    private tutorService: TutorService
  ) {}

  ngOnInit(): void {
    this.listarPets();
    this.listarTutores();
  }

  listarPets(): void {
    this.petService.listar().subscribe({
      next: dados => this.pets = dados,
      error: erro => console.error('Erro ao listar pets:', erro)
    });
  }

  listarTutores(): void {
    this.tutorService.listar().subscribe({
      next: dados => this.tutores = dados,
      error: erro => console.error('Erro ao listar tutores:', erro)
    });
  }

  get petsFiltrados(): Pet[] {
    const termo = this.pesquisa.toLowerCase();

    return this.pets.filter(pet =>
      pet.nome.toLowerCase().includes(termo) ||
      (pet.tutor?.nome || '').toLowerCase().includes(termo)
    );
  }

  salvarPet(): void {
    if (!this.novoPet.nome || !this.novoPet.especie || !this.novoPet.tutorId) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    const pet: Pet = {
      nome: this.novoPet.nome,
      especie: this.novoPet.especie,
      raca: this.novoPet.raca,
      tutor: {
        id: this.novoPet.tutorId
      }
    };

    if (this.editandoId !== null) {
      this.petService.atualizar(this.editandoId, pet).subscribe({
        next: () => {
          alert('Pet atualizado com sucesso!');
          this.cancelarFormulario();
          this.listarPets();
        },
        error: erro => {
          console.error(erro);
          alert('Erro ao atualizar pet.');
        }
      });
    } else {
      this.petService.cadastrar(pet).subscribe({
        next: () => {
          alert('Pet cadastrado com sucesso!');
          this.cancelarFormulario();
          this.listarPets();
        },
        error: erro => {
          console.error(erro);
          alert('Erro ao cadastrar pet.');
        }
      });
    }
  }

  editarPet(pet: Pet): void {
    this.novoPet = {
      nome: pet.nome,
      especie: pet.especie,
      raca: pet.raca,
      tutorId: pet.tutor.id
    };

    this.editandoId = pet.id!;
    this.mostrarFormulario = true;
  }

  excluirPet(id: number): void {
    if (confirm('Deseja realmente excluir este pet?')) {
      this.petService.excluir(id).subscribe({
        next: () => {
          alert('Pet excluído com sucesso!');
          this.listarPets();
        },
        error: erro => {
          console.error(erro);
          alert('Erro ao excluir pet.');
        }
      });
    }
  }

  cancelarFormulario(): void {
    this.novoPet = {
      nome: '',
      especie: '',
      raca: '',
      tutorId: null
    };

    this.editandoId = null;
    this.mostrarFormulario = false;
  }
}

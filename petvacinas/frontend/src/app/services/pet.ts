import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pet {
  id?: number;
  nome: string;
  especie: string;
  raca: string;
  tutor: {
    id: number;
    nome?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = 'https://verbose-space-train-xr4pr5gr46w6c67w9-8080.app.github.dev/pets';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  cadastrar(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  atualizar(id: number, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, pet);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
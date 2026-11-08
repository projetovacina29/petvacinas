
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tutor {
  id?: number;
  nome: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  private apiUrl = 'http://localhost:8080/tutores';

  constructor(private http: HttpClient) {}

  listar(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.apiUrl}/${id}`);
  }

  cadastrar(tutor: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(this.apiUrl, tutor);
  }

  atualizar(id: number, tutor: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.apiUrl}/${id}`, tutor);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
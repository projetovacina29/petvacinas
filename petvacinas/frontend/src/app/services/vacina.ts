
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vacina {
  id?: number;
  nome: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  private apiUrl = 'https://verbose-space-train-xr4pr5gr46w6c67w9-8080.app.github.dev/vacinas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(this.apiUrl);
  }

  cadastrar(vacina: Vacina): Observable<Vacina> {
    return this.http.post<Vacina>(this.apiUrl, vacina);
  }

  atualizar(id: number, vacina: Vacina): Observable<Vacina> {
    return this.http.put<Vacina>(`${this.apiUrl}/${id}`, vacina);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

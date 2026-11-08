
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aplicacao {
  id?: number;
  dataAplicacao: string;
  proximaDose: string;
  pet: {
    id: number;
    nome?: string;
  };
  vacina: {
    id: number;
    nome?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AplicacaoService {

  private apiUrl = 'https://verbose-space-train-xr4pr5gr46w6c67w9-8080.app.github.dev/aplicacoes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Aplicacao[]> {
    return this.http.get<Aplicacao[]>(`${this.apiUrl}/com-detalhes`);
  }

  cadastrar(aplicacao: Aplicacao): Observable<Aplicacao> {
    return this.http.post<Aplicacao>(this.apiUrl, aplicacao);
  }

  atualizar(id: number, aplicacao: Aplicacao): Observable<Aplicacao> {
    return this.http.put<Aplicacao>(`${this.apiUrl}/${id}`, aplicacao);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

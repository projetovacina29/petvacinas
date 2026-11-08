package br.edu.unifio.petvacinas.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Vacina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;

    private String descricao;
}
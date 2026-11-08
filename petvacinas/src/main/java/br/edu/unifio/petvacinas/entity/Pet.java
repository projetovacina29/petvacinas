package br.edu.unifio.petvacinas.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;

    private String especie;

    private String raca;

    @ManyToOne
    @JoinColumn(name = "tutor_id")
    private Tutor tutor;
}
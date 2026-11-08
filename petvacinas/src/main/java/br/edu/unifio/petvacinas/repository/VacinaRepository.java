package br.edu.unifio.petvacinas.repository;

import br.edu.unifio.petvacinas.entity.Vacina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacinaRepository extends JpaRepository<Vacina, Integer> {

}
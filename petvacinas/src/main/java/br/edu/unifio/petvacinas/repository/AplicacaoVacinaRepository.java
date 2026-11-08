package br.edu.unifio.petvacinas.repository;

import br.edu.unifio.petvacinas.entity.AplicacaoVacina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AplicacaoVacinaRepository extends JpaRepository<AplicacaoVacina, Integer> {

}
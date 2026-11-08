package br.edu.unifio.petvacinas.repository;

import br.edu.unifio.petvacinas.entity.AplicacaoVacina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface AplicacaoVacinaRepository extends JpaRepository<AplicacaoVacina, Integer> {

    @Query("SELECT a FROM AplicacaoVacina a JOIN FETCH a.pet JOIN FETCH a.vacina")
    List<AplicacaoVacina> listarComPetEVacina();

    @Query("SELECT COUNT(a) FROM AplicacaoVacina a")
    long contarAplicacoes();
}
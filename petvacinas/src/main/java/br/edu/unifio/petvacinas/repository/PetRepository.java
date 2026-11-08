package br.edu.unifio.petvacinas.repository;

import br.edu.unifio.petvacinas.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Integer> {

}
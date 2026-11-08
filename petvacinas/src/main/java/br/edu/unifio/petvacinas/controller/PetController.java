package br.edu.unifio.petvacinas.controller;

import br.edu.unifio.petvacinas.entity.Pet;
import br.edu.unifio.petvacinas.repository.PetRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
@CrossOrigin(origins = "*")
public class PetController {

    private final PetRepository repository;

    public PetController(PetRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Pet> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Pet buscarPorId(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public Pet cadastrar(@RequestBody Pet pet) {
        return repository.save(pet);
    }

    @PutMapping("/{id}")
    public Pet atualizar(@PathVariable Integer id, @RequestBody Pet pet) {
        pet.setId(id);
        return repository.save(pet);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}

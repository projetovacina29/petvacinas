package br.edu.unifio.petvacinas.controller;

import br.edu.unifio.petvacinas.entity.Tutor;
import br.edu.unifio.petvacinas.repository.TutorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutores")
@CrossOrigin(origins = "*")
public class TutorController {

    private final TutorRepository repository;

    public TutorController(TutorRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Tutor> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Tutor buscarPorId(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public Tutor cadastrar(@RequestBody Tutor tutor) {
        return repository.save(tutor);
    }

    @PutMapping("/{id}")
    public Tutor atualizar(@PathVariable Integer id, @RequestBody Tutor tutor) {
        tutor.setId(id);
        return repository.save(tutor);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}

package br.edu.unifio.petvacinas.controller;

import br.edu.unifio.petvacinas.entity.Vacina;
import br.edu.unifio.petvacinas.repository.VacinaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vacinas")
@CrossOrigin(origins = "*")
public class VacinaController {

    private final VacinaRepository repository;

    public VacinaController(VacinaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Vacina> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Vacina buscarPorId(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public Vacina cadastrar(@RequestBody Vacina vacina) {
        return repository.save(vacina);
    }

    @PutMapping("/{id}")
    public Vacina atualizar(@PathVariable Integer id, @RequestBody Vacina vacina) {
        vacina.setId(id);
        return repository.save(vacina);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}

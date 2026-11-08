package br.edu.unifio.petvacinas.controller;

import br.edu.unifio.petvacinas.entity.AplicacaoVacina;
import br.edu.unifio.petvacinas.repository.AplicacaoVacinaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aplicacoes")
@CrossOrigin(origins = "*")
public class AplicacaoVacinaController {

    private final AplicacaoVacinaRepository repository;

    public AplicacaoVacinaController(AplicacaoVacinaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<AplicacaoVacina> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id:\\d+}")
    public AplicacaoVacina buscarPorId(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public AplicacaoVacina cadastrar(@RequestBody AplicacaoVacina aplicacao) {
        return repository.save(aplicacao);
    }

    @PutMapping("/{id}")
    public AplicacaoVacina atualizar(@PathVariable Integer id, @RequestBody AplicacaoVacina aplicacao) {
        aplicacao.setId(id);
        return repository.save(aplicacao);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Integer id) {
        repository.deleteById(id);
    }

       @GetMapping("/com-detalhes")
    public List<AplicacaoVacina> listarComDetalhes() {
        return repository.listarComPetEVacina();
    }

    @GetMapping("/contar")
    public long contarAplicacoes() {
        return repository.contarAplicacoes();
    }
}
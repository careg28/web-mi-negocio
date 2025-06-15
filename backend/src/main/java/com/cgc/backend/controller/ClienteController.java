package com.cgc.backend.controller;

import com.cgc.backend.model.Cliente;
import com.cgc.backend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:4200") // Para el CORS
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public Cliente saveCliente(@RequestBody Cliente cliente) {
        return clienteService.saveCliente(cliente);
    }

    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteService.getAllClientes();
    }
}

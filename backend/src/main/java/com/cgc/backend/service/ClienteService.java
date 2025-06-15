package com.cgc.backend.service;

// src/main/java/com/cgc/backend/service/ClienteService.java
import com.cgc.backend.model.Cliente;
import com.cgc.backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente saveCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }
}

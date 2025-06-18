package com.cgc.backend.controller;

import com.cgc.backend.model.Cliente;
import com.cgc.backend.request.ClienteRequest;
import com.cgc.backend.service.ClienteService;
import com.cgc.backend.service.RecaptchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:4200")
public class ClienteController {

  @Autowired
  private ClienteService clienteService;

  @Autowired
  private RecaptchaService recaptchaService;

  @PostMapping
  public ResponseEntity<?> saveCliente(@RequestBody ClienteRequest request) {
    boolean isCaptchaValid = recaptchaService.validateToken(request.getRecaptchaToken());

    if (!isCaptchaValid) {
      return ResponseEntity.badRequest().body("Error: reCAPTCHA inválido.");
    }

    Cliente cliente = new Cliente();
    cliente.setNombre(request.getNombre());
    cliente.setCorreo(request.getCorreo());
    cliente.setDescripcion(request.getDescripcion());

    clienteService.saveCliente(cliente);
    return ResponseEntity.ok("Cliente guardado correctamente.");
  }

  @GetMapping
  public List<Cliente> getAllClientes() {
    return clienteService.getAllClientes();
  }
}

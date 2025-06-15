package com.cgc.backend.controller;

import com.cgc.backend.model.Usuario;
import com.cgc.backend.security.JwtUtil;
import com.cgc.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> getUsuarioById(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id);
    }

    @PostMapping
    public Usuario saveUsuario(@RequestBody Usuario usuario) {
        return usuarioService.saveUsuario(usuario);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
    }

    // Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<Usuario> usuarioOpt = usuarioService.getUsuarioByUsername(username);
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (passwordEncoder.matches(password, usuario.getPassword())) {
                // Ahora incluye el rol en el JWT
              String token = jwtUtil.generateToken(username, usuario.getRol().name());
                return ResponseEntity.ok(Map.of(
                  "token", token,
                  "username", usuario.getUsername(),
                  "rol", usuario.getRol().name(),   // <-- aquí también
                  "nombre", usuario.getNombre(),
                  "correo", usuario.getCorreo()
                ));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario o contraseña incorrectos");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/solo-admins")
    public String adminOnly() {
        return "¡Solo los ADMIN pueden ver esto!";
    }


}

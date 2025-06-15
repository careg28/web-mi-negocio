package com.cgc.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HolaController {
    @GetMapping("/api/hola")
    public String hola() {
        return "¡Hola desde Spring Boot!";
    }
}

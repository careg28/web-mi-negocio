package com.cgc.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET = "mi_clave_ultrasecreta_de_prueba_1234567890123456789012345";
    private final long EXPIRATION = 1000 * 60 * 60 * 4; // 4 horas

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Generar token con username y rol
    public String generateToken(String username, String rol) {
        return Jwts.builder()
                .setSubject(username)
                .claim("rol", rol)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Obtener username del token
    public String getUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Obtener rol del token
    public String getRol(String token) {
      Claims claims = Jwts.parserBuilder().setSigningKey(key).build()
        .parseClaimsJws(token)
        .getBody();
      return claims.get("rol", String.class);
    }

    // Validar token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}


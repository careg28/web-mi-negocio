package com.cgc.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@Service
public class RecaptchaService {
  @Value("${google.recaptcha.secret}")
  private String recaptchaSecret;

  private static final String VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

  private final RestTemplate restTemplate;

  public RecaptchaService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  public boolean validateToken(String token) {
    String url = VERIFY_URL + "?secret=" + recaptchaSecret + "&response=" + token;
    try {
      ResponseEntity<Map> response = restTemplate.postForEntity(url, null, Map.class);
      Map<String, Object> body = response.getBody();
      return body != null && Boolean.TRUE.equals(body.get("success"));
    } catch (Exception e) {
      System.err.println("Error validando reCAPTCHA: " + e.getMessage());
      return false;
    }
  }
}


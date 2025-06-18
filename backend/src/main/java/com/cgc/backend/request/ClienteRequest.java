package com.cgc.backend.request;

import lombok.Data;

@Data
public class ClienteRequest {
  private String nombre;
  private String correo;
  private String descripcion;
  private String recaptchaToken;
}

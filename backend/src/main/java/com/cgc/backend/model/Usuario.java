package com.cgc.backend.model;
import com.cgc.backend.model.Rol;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //indicamos que el id es la llave primaria El valor de id se autoincrementa en la base de datos.
    private Long id;

    private String nombre;
    private String correo;
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    private Rol rol;

    public Usuario() {}



  public Usuario(Long id, String nombre, String correo, String username, String password, Rol rol) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.username = username;
    this.password = password;
    this.rol = rol;
  }

  // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    //@JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Rol getRol() {
      return rol;
    }

    public void setRol(Rol rol) {
      this.rol = rol;
    }



}

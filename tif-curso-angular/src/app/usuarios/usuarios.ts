import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms"

interface Usuario {
  nombre: string,
  email: string,
  numeroCel: string,
  password: string,
  estado: boolean,
  ultimoConexion: string,
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  form!: FormGroup
  usuarios: Usuario[] = []

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      numeroCel: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      estado: ['']
    });

    this.cargarUsuarios();
  }

  guardarUsuario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nuevoUsuario: Usuario = {
      nombre: this.form.value.nombre,
      email: this.form.value.email,
      numeroCel: this.form.value.numeroCel,
      password: this.form.value.password,
      estado: true,
      ultimoConexion: new Date().toISOString()
    };

    this.usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));

    this.form.reset();
  }

  cargarUsuarios(): void {
    const usuariosGuardados = localStorage.getItem('usuarios');

    if (usuariosGuardados) {
      this.usuarios = JSON.parse(usuariosGuardados);
    }
  }

}


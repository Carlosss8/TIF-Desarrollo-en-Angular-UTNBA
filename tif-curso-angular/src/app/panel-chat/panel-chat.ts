import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Conversacion, Mensaje, Usuarios } from '../usuarios/usuarios';
import { Usuario } from '../usuarios/usuarios';
import { User } from '../services/user';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms"


@Component({
  selector: 'app-panel-chat',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatListModule, CommonModule, ReactiveFormsModule],
  templateUrl: './panel-chat.html',
  styleUrl: './panel-chat.css'
})
export class PanelChat implements OnInit {
  usuarios: Usuario[] = []
  usuarioSeleccionado: Usuario | null = null;
  conversaciones: Conversacion[] = []
  conversacionActual!: Conversacion
  form!: FormGroup

  constructor(private usuariosService: User, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.usuarios = this.usuariosService.obtenerUsuarios();

    this.form = this.fb.group({
      mensaje: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  seleccionarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;

    const conversacionEncontrada = this.conversaciones.find(c => c.numeroCel === usuario.numeroCel)

    if (conversacionEncontrada) {
      this.conversacionActual = conversacionEncontrada
    } else {
      const nuevaConversacion: Conversacion = {
        numeroCel: usuario.numeroCel,
        mensajes: []
      }
      this.conversaciones.push(nuevaConversacion)
      this.conversacionActual = nuevaConversacion
    }
  }

  enviarMensaje() {
    if (this.form.valid) {
      const texto = this.form.value.mensaje
      const nuevoMensaje: Mensaje = {
        texto: texto,
        emisor: 'usuario',
        hora: new Date().toLocaleTimeString()
      }
      this.conversacionActual.mensajes.push(nuevoMensaje)
      this.form.reset()

      setTimeout(() => {
        const respuestaApp: Mensaje = {
          texto: 'Hola, recibí tu mensaje',
          emisor: 'app',
          hora: new Date().toLocaleTimeString()
        };

        this.conversacionActual.mensajes.push(respuestaApp);
      }, 1000);
    }

  }



}

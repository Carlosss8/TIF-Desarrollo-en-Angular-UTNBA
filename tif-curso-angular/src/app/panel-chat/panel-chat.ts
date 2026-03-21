import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Conversacion } from '../models/conversacion';
import { Mensaje } from '../models/mensaje';
import { Usuario } from '../models/usuario';
import { User } from '../services/user';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChatServices } from '../services/chat-services';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NuevoChatModal } from '../nuevo-chat-modal/nuevo-chat-modal';

@Component({
  selector: 'app-panel-chat',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatListModule, CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './panel-chat.html',
  styleUrl: './panel-chat.css'
})
export class PanelChat implements OnInit {
  usuarios: Usuario[] = []
  usuarioSeleccionado: Usuario | null = null;
  conversacionActual: Conversacion | null = null
  form!: FormGroup
  usuariosSearch: Usuario[] = []

  constructor(private usuariosService: User, private fb: FormBuilder, private chatService: ChatServices, private dialog: MatDialog) { }

  ngOnInit(): void {
    const lista = this.usuariosService.obtenerUsuarios();

    this.usuariosSearch = lista;
    this.usuarios = [...lista];

    this.form = this.fb.group({
      mensaje: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  buscarChat(texto: string) {

    if (!texto) {
      this.usuariosSearch = [...this.usuarios]
    } else {
      this.usuariosSearch = this.usuarios.filter(u => u.nombre.toLowerCase().includes(texto.toLowerCase()))
    }

  }

  seleccionarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.conversacionActual = this.chatService.obtenerOCrearConversacion(usuario.numeroCel);
  }

  enviarMensaje() {
    if (this.form.valid && this.usuarioSeleccionado) {
      const texto = this.form.value.mensaje.trim();

      if (!texto) return;

      const nuevoMensaje: Mensaje = {
        texto: texto,
        emisor: 'usuario',
        hora: new Date().toLocaleTimeString()
      };

      this.chatService.agregarMensaje(this.usuarioSeleccionado.numeroCel, nuevoMensaje);
      this.conversacionActual = this.chatService.obtenerOCrearConversacion(this.usuarioSeleccionado.numeroCel);
      this.form.reset();

      const numeroCel = this.usuarioSeleccionado.numeroCel;

      setTimeout(() => {
        const respuestaApp: Mensaje = {
          texto: 'Hola como estas, ¡recibi tu mensaje!',
          emisor: 'app',
          hora: new Date().toLocaleTimeString()
        };

        this.chatService.agregarMensaje(numeroCel, respuestaApp);

        if (this.usuarioSeleccionado?.numeroCel === numeroCel) {
          this.conversacionActual = this.chatService.obtenerOCrearConversacion(numeroCel);
        }
      }, 1000);
    }
  }

  abrirModalNuevoChat(): void {
    const dialogRef = this.dialog.open(NuevoChatModal, {
      width: '420px'
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.usuariosService.agregarUsuario(resultado);

        const listaActualizada = this.usuariosService.obtenerUsuarios();

        this.usuarios = [...listaActualizada];
        this.usuariosSearch = [...listaActualizada];

        const usuarioNuevo = this.usuarios.find(
          u => u.numeroCel === resultado.numeroCel
        );

        if (usuarioNuevo) {
          this.seleccionarUsuario(usuarioNuevo);
        }
      }
    });
  }



}

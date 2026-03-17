import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Usuarios } from '../usuarios/usuarios';
import { Usuario } from '../usuarios/usuarios';
import { User } from '../services/user';
import { Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-panel-chat',
  imports: [MatSidenavModule, MatToolbarModule, MatListModule, CommonModule],
  templateUrl: './panel-chat.html',
  styleUrl: './panel-chat.css',
})
export class PanelChat {
  usuarios: Usuario[] = []

  constructor(private usuariosService: User) { }

  ngOnInit(): void {
    this.usuarios = this.usuariosService.obtenerUsuarios();
  }
}

import { Injectable } from '@angular/core';
import { Usuario } from '../usuarios/usuarios';

@Injectable({
  providedIn: 'root',
})
export class User {
  private clave = 'usuarios';

  obtenerUsuarios(): Usuario[] {
    const data = localStorage.getItem(this.clave);
    return data ? JSON.parse(data) : [];
  }

  guardarUsuarios(usuarios: Usuario[]): void {
    localStorage.setItem(this.clave, JSON.stringify(usuarios));
  }

  agregarUsuario(usuario: Usuario): void {
    const usuarios = this.obtenerUsuarios();
    usuarios.push(usuario);
    this.guardarUsuarios(usuarios);
  }
}

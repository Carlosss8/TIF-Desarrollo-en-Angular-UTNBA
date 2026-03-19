import { Injectable } from '@angular/core';
import { Conversacion } from '../models/conversacion';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root',
})
export class ChatServices {
  private claveConversaciones = 'conversaciones';

  obtenerConversaciones(): Conversacion[] {
    const data = localStorage.getItem(this.claveConversaciones);
    return data ? JSON.parse(data) : [];
  }

  guardarConversaciones(conversaciones: Conversacion[]): void {
    localStorage.setItem(this.claveConversaciones, JSON.stringify(conversaciones));
  }

  obtenerOCrearConversacion(numeroCel: string): Conversacion {
    const conversaciones = this.obtenerConversaciones();

    let conversacion = conversaciones.find(c => c.numeroCel === numeroCel);

    if (!conversacion) {
      conversacion = {
        numeroCel: numeroCel,
        mensajes: []
      };

      conversaciones.push(conversacion);
      this.guardarConversaciones(conversaciones);
    }

    return conversacion;
  }

  agregarMensaje(numeroCel: string, mensaje: Mensaje): void {
    const conversaciones = this.obtenerConversaciones();

    const conversacion = conversaciones.find(c => c.numeroCel === numeroCel);

    if (conversacion) {
      conversacion.mensajes.push(mensaje);
      this.guardarConversaciones(conversaciones);
    }
  }
}
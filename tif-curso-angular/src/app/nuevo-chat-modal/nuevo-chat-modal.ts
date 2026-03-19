import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-nuevo-chat-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './nuevo-chat-modal.html',
  styleUrls: ['./nuevo-chat-modal.css']
})
export class NuevoChatModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<NuevoChatModal>);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    numeroCel: ['', [Validators.required, Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      nombre: this.form.value.nombre!,
      email: this.form.value.email!,
      numeroCel: this.form.value.numeroCel!,
      password: this.form.value.password!,
      estado: true,
      ultimoConexion: new Date().toISOString()
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}

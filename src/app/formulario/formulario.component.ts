import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  form: FormGroup;
  submitButtonDisabled: boolean = true;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.form.statusChanges.subscribe(() => {
      this.submitButtonDisabled = this.form.invalid ?? true;
    });
  }

  // ✅ Bloquear números en el campo de nombre
  preventNumbers(event: KeyboardEvent) {
    const charCode = event.key;
    if (/\d/.test(charCode)) {
      event.preventDefault(); // Bloquear números
    }
  }

  // ✅ Bloquear letras y símbolos en el campo de número
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.key;

    // Permitir solo números y teclas de navegación
    if (!/^\d$/.test(charCode) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(charCode)) {
      event.preventDefault();
    }

    // Limitar a 10 dígitos
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 10) {
      event.preventDefault();
    }
  }

  // ✅ Método para validar si el campo es inválido
  isInvalidField(field: string): boolean {
    return this.form.get(field)?.invalid && (this.form.get(field)?.dirty || this.form.get(field)?.touched) || false;
  }

  // ✅ Método para mostrar mensajes de error específicos
  getErrorMessage(field: string): string {
    if (field === 'name') {
      if (this.form.get(field)?.hasError('required')) return 'El nombre es obligatorio';
      if (this.form.get(field)?.hasError('pattern')) return 'Solo se permiten letras y espacios';
    }
    if (field === 'phone') {
      if (this.form.get(field)?.hasError('required')) return 'El número de teléfono es obligatorio';
      if (this.form.get(field)?.hasError('pattern')) return 'Debe tener exactamente 10 dígitos';
    }
    if (field === 'email') {
      if (this.form.get(field)?.hasError('required')) return 'El correo es obligatorio';
      if (this.form.get(field)?.hasError('email')) return 'Formato de correo inválido';
    }
    return '';
  }

  // ✅ Método para enviar el formulario
  onSubmit() {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
      alert('Formulario enviado correctamente');
    } else {
      this.form.markAllAsTouched();
    }
  }
  
}

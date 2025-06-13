//Importaciones
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormularioComponent implements OnInit {

   // Formulario reactivo
  form!: FormGroup;
  
 // Estado para desactivar el botón mientras el formulario es inválido
  submitButtonDisabled = true;

  // Control de visibilidad del formulario en pasos
  showForm1: boolean = true;
  showForm2: boolean = false;
  showThankYou = false;
  showSuccessCard: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Inicialización del formulario reactivo con validaciones
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      tipoReserva: ['', Validators.required],
      numeroPersonas: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      comentarios: ['', [Validators.maxLength(500)]]
    });

    // Validación dinámica de fechas CheckIn/CheckOut
    this.form.get('checkIn')?.valueChanges.subscribe(() => this.setCheckOutError());
    this.form.get('checkOut')?.valueChanges.subscribe(() => this.setCheckOutError());

    // Observador para desactivar el botón cuando el formulario es inválido
    this.form.statusChanges.subscribe(status => {
      this.submitButtonDisabled = status !== 'VALID';
    });
  }

  // Evita que se ingresen números en el campo "nombre"
  preventNumbers(event: KeyboardEvent) {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
      this.form.get('name')?.setErrors({ invalidCharacter: true });
    } else {
      this.form.get('name')?.setErrors(null);
    }
  }

  // Permite solo números en el campo "teléfono"
  allowOnlyNumbers(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];

    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
      this.form.get('phone')?.setErrors({ invalidCharacter: true });
    } else {
      const control = this.form.get('phone');
      if (control?.hasError('invalidCharacter')) {
        control.setErrors(null);
      }
    }
  }

  // Verifica si el campo es inválido y fue tocado o modificado
  isInvalidField(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  // Mensajes personalizados de error según el tipo de validación
  getErrorMessage(field: string): string {
    const control = this.form.get(field);

    if (control?.hasError('min')) return 'Debe ser al menos 1';
    if (control?.hasError('max')) return 'No puede superar las 100 personas';
    if (control?.hasError('invalidDateRange')) return 'La fecha de salida debe ser posterior a la fecha de entrada';
    if (control?.hasError('maxlength')) return `Máximo ${control.errors?.['maxlength'].requiredLength} caracteres permitidos`;
    if (control?.hasError('required')) return 'Este campo es obligatorio';
    if (control?.hasError('minlength')) return `Debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
    if (control?.hasError('pattern')) {
      return field === 'phone' ? 'El número debe tener exactamente 10 dígitos' : 'Formato inválido';
    }
    if (control?.hasError('invalidCharacter')) {
      return field === 'name' ? 'Solo se permiten letras y espacios' : 'Solo se permiten números';
    }
    if (control?.hasError('email')) return 'Formato de correo electrónico inválido';

    if (field === 'checkOut' && !this.isCheckOutValid()) {
      return 'La fecha de salida debe ser posterior a la fecha de entrada';
    }

    return '';
  }

  // Avanza a la segunda parte del formulario si los campos están válidos
  goToNextForm() {
    if (this.form.get('name')?.valid && this.form.get('phone')?.valid && this.form.get('email')?.valid) {
      console.log('Formulario válido, avanzando a la siguiente parte');
      this.showForm1 = false;
      this.showForm2 = true;
    } else {
      console.log('Formulario inválido');
      this.form.markAllAsTouched();
    }
  }

  // Regresa a la primera parte del formulario
  goToPreviousForm() {
    this.showForm1 = true;
    this.showForm2 = false;
  }

  // Cierra y reinicia el formulario
  closeForm() {
    this.showForm1 = true;
    this.showForm2 = false;
    this.form.reset();
  }

  // Envia los datos del formulario al servidor
  onSubmit(): void {
    if (this.form.valid && this.isCheckOutValid()) {
      const formData = this.form.value;

      this.http.post('http://localhost:3000/enviar-correo', formData).subscribe({
        next: () => {
          console.log('Correo enviado con éxito');
          this.showSuccessCard = true;
          this.showThankYou = true;
          this.form.reset();
          this.showForm1 = true;
          this.showForm2 = false;
        },
        error: (err) => {
          console.error('Error al enviar correo', err);
          alert('Ocurrió un error al enviar el correo.');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  // Cierra el mensaje de agradecimiento y reinicia el formulario
  closeThankYou() {
    this.showThankYou = false;
    this.form.reset();
    this.showForm1 = true;
    this.showForm2 = false;
  }

  // Valida que la fecha de Check-Out sea posterior al Check-In
  isCheckOutValid(): boolean {
    const checkIn = this.form.get('checkIn')?.value;
    const checkOut = this.form.get('checkOut')?.value;
    if (checkIn && checkOut) {
      return new Date(checkOut) > new Date(checkIn);
    }
    return true;
  }

  // Establece error si la fecha de salida es inválida
  setCheckOutError(): void {
    const checkOutControl = this.form.get('checkOut');
    if (checkOutControl) {
      if (!this.isCheckOutValid()) {
        checkOutControl.setErrors({ invalidDateRange: true });
      } else if (checkOutControl.hasError('invalidDateRange')) {
        checkOutControl.setErrors(null);
      }
    }
  }

  // Cierra tarjeta de éxito sin redirigir
  closeSuccessCard() {
    this.showSuccessCard = false;
    this.form.reset();
    this.showForm1 = true;
    this.showForm2 = false;
  }

  // Cierra tarjeta de éxito y redirige a la página de inicio
  closeSuccessCard1() {
    this.showSuccessCard = false;
    this.form.reset();
    this.showForm1 = true;
    this.showForm2 = false;
    this.router.navigate(['/Home']);
  }

  // Cierra formulario y redirige directamente a Home
  closeAndRedirect() {
    this.showForm1 = true;
    this.showForm2 = false;
    this.form.reset();
    this.router.navigate(['/Home']);
  }
}


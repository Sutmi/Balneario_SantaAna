import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  scrollToContact() {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  scrollToServicios() {
    const contactSection = document.getElementById('Servicios');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  scrollToInicio() {
    const contactSection = document.getElementById('Inicio');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  scrollToInstalaciones() {
    const contactSection = document.getElementById('Instalaciones');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

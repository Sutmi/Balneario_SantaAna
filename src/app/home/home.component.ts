//Importaciones
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatbotService } from '../services/chatbot.service';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatbotComponent, CommonModule],//Importaciones de componentes necesarios
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    // Controla la visibilidad del componente del chatbot
  showChat = false;

    // Arreglo de indicadores para el carrusel (8 posiciones)
  indicators = Array(8).fill(0); 

    // Índice actual del carrusel
  currentSlide = 0;

  // Inyecta el router para navegación y el servicio del chatbot
  constructor(private router: Router, private chatbotService: ChatbotService) {}

  // Ciclo de vida al inicializar el componente
  ngOnInit() {}

  //Alterna la visibilidad del chatbot
  toggleChat() {
    this.showChat = !this.showChat;
  }

   // Navega al componente de reservaciones
  irAFormulario() {
    this.router.navigate(['/Reservaciones']);
  }

  // Scroll suave hacia la sección de contacto
  scrollToContact() {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Scroll hacia la sección de servicios
  scrollToServicios() {
    const section = document.getElementById('Servicios');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Scroll hacia la sección de inicio
  scrollToInicio() {
    const section = document.getElementById('Inicio');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Scroll hacia la sección de instalaciones
  scrollToInstalaciones() {
    const section = document.getElementById('Instalaciones');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

   // Cambia manualmente el slide del carrusel a un índice dado
  goToSlide(index: number) {
    const list = document.querySelector('.slider .list') as HTMLElement;

    if (list) {
      // Agrega clase para pausar animación automática
      list.classList.add('manual-control');
       // Calcula el ancho de cada slide y aplica la transformación
      const slideWidth = list.offsetWidth / this.indicators.length;
      list.style.transform = `translateX(-${index * slideWidth}px)`;
      // Actualiza el índice actual
      this.currentSlide = index;
  
      // Después de 5 segundos, se reactiva la animación automática
      setTimeout(() => {
        list.classList.remove('manual-control');
        list.style.transform = '';
      }, 5000); // Vuelve a la animación luego de 5s
    }
  }
  
}

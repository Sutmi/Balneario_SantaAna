import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: false,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})

export class HeroSectionComponent {
  scrollToForm() {
    const formElement = document.getElementById('form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
}

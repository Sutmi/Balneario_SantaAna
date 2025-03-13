import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  userMessage = '';
  messages: { text: string; sender: string }[] = [];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, sender: 'user' });

      // Lógica de respuesta automática
      this.generateResponse(this.userMessage);

      this.userMessage = ''; // Limpiar input después de enviar
    }
  }

  generateResponse(message: string) {
    let response = '';

    // 🔥 Ejemplo de lógica básica (ajústalo según tus necesidades)
    if (message.toLowerCase().includes('hola')) {
      response = '¡Hola! ¿En qué puedo ayudarte hoy?';
    } else if (message.toLowerCase().includes('precio')) {
      response = 'El precio de las entradas es de $150 pesos para adultos y $100 para niños.';
    } else if (message.toLowerCase().includes('horario')) {
      response = 'Nuestro horario es de 9:00 AM a 6:00 PM todos los días.';
    } else {
      response = 'Lo siento, no entiendo esa pregunta. ¿Podrías intentar de nuevo?';
    }

    setTimeout(() => {
      this.messages.push({ text: response, sender: 'bot' });
    }, 1000); // Simulación de tiempo de respuesta
  }
}

//Importaciones
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../services/chatbot.service';
import { SafePipe } from './safe.pipe';


// Declaración global para el reconocimiento de voz
declare var annyang: any;

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, SafePipe],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
    // Comunicación con el componente padre (cerrar el chatbot)
  @Output() closeChat = new EventEmitter<void>();
  // Visibilidad del chatbot
  showChat = false;
  // Entrada del usuario
  newMessage: string = '';
  // Grabación activa
  isRecording: boolean = false;
  // Si annyang está disponible
  speechSupported: boolean = false;
   // Cargando respuesta
  isLoading: boolean = false;
  // Lista de videos TikTok
  tiktokVideos: any[] = [];

   // Historial de mensajes
  messages: { content: string, type: 'user' | 'bot' }[] = [
    { content: '¡Hola! ¿En qué puedo ayudarte? 😊', type: 'bot' }
  ];

  constructor(private chatbotService: ChatbotService) {}

   // Enviar mensaje y obtener respuesta
  sendMessage() {
    const message = this.newMessage.trim();
    if (!message) return;
  
    this.messages.push({ content: message, type: 'user' });
    this.newMessage = '';
    this.isLoading = true;
  
    const lower = message.toLowerCase();
  
    //Consultar videos
    if (lower.includes('video') || lower.includes('tiktok') || lower.includes('reel')) {
      this.chatbotService.getVideosTiktok().then(videos => {
        this.tiktokVideos = videos;
        this.messages.push({ content: '__videos__', type: 'bot' });
        this.isLoading = false;
      }).catch(() => {
        this.messages.push({ content: 'Lo siento, no pude obtener los videos en este momento.', type: 'bot' });
        this.isLoading = false;
      });
      return;
    }
  
const keywords = [
  'precio', 'entrada', 'tarifa', 'cuánto cuesta',
  'horario', 'hora de apertura',
  'cabaña', 'cabañas',
  'servicio', 'servicios', 'actividades', 'qué ofrecen',
  'comida', 'llevar', 'condiciones',
  'restaurantes', 'venden',
  'wifi', 'señal',
  'plan familiar', 'promoción',
  'locker',
  'transporte', 'cómo llegar',
  'tienda', 'tiendas',
  'hotel', 'habitacion', 'habitaciones',
  'camping', 'campamento',
  'mascotas', 'pet friendly', 'animales'
];

if (keywords.some(kw => lower.includes(kw))) {
  this.chatbotService.getMessageFromGPT(message).then(response => {
    this.messages.push({ content: response, type: 'bot' });
    this.isLoading = false;
  }).catch(() => {
    this.messages.push({ content: 'Lo siento, no pude responder a tu pregunta.', type: 'bot' });
    this.isLoading = false;
  });
  return;
}
  }
  
// Reconocimiento de voz
  ngOnInit() {

    if (annyang) {
      this.speechSupported = true;
      annyang.setLanguage('es-ES');

      annyang.addCallback('result', (phrases: string[]) => {
        const message = phrases[0];
        this.newMessage = message;
        this.sendMessage();
        this.buscarVideos();
      });

      console.log('annyang listo');
    } else {
      console.warn('annyang no está disponible');
    }
  }
// Iniciar reconocimiento
  startRecording() {
    if (annyang) {
      this.isRecording = true;
      annyang.start({ autoRestart: true, continuous: true });
    }
  }
// Detener reconocimiento
  stopRecording() {
    if (annyang) {
      this.isRecording = false;
      annyang.abort();
    }
  }
// Botón para cerrar el chatbot
  closeChatBox() {
    this.showChat = false;
    this.closeChat.emit();
  }
// Consulta directa de videos
  async buscarVideos() {
    this.tiktokVideos = await this.chatbotService.getVideosTiktok();
  }
 // Alternar grabación
  toggleRecording() {
    this.isRecording ? this.stopRecording() : this.startRecording();
  }
  
}

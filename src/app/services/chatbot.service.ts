import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  async getMessageFromGPT(userMessage: string): Promise<string> {
    const lower = userMessage.toLowerCase().trim();

    // 🟡 Interceptar preguntas frecuentes
    if (
      lower === 'precio' ||
      lower === 'precios' ||
      lower.includes('precio entrada') ||
      lower.includes('cuánto cuesta') ||
      lower.includes('tarifa') ||
      lower.includes('entrada')
    ) {
      return `🎟️ Precios:\n- 
      * Entrada general: $150\n- 
      * Niños: $100\n- 
      * Adultos mayores: $120\n- 
      * Menores de 3 años: Gratis`;
    }
    

    if (
    lower.includes('horario') || 
    lower.includes('horarios')||
    lower.includes('hora de apertura') 
     
  ) {
    return `🕒 Horario del Balneario Santa Ana:
  - Abierto todos los días de 8:00 AM a 8:00 PM.`;
    }

    if (
      lower.includes('servicio') || 
      lower.includes('servicios') || 
      lower.includes('Actividades') || 
      lower.includes('actividades') || 
      lower.includes('qué ofrecen')
    ) {
    return `🧴 *Servicios del Balneario Santa Ana*:
  - Albercas familiares y de olas
  - Toboganes
  - Zona de masajes y spa
  - Restaurante y antojitos
  - Área de camping y cabañas
  - Hotel
  - Tienda con artículos varios
  - Sanitarios y regaderas
  - Lockers`;
    }

    if (
      lower.includes('mascotas')|| 
      lower.includes('pet friendly')|| 
      lower.includes('animales') 
    ) {
      return `🐾 Política de mascotas:
  - No se permite el ingreso con mascotas al balneario.`;
    }

    if (
      (lower.includes('comida')
       && lower.includes('llevar')) || 
       lower.includes('Condiciones')
      ) {
      return `🚫 *Reglas sobre alimentos*:
  - No se permite ingresar con alimentos o bebidas.
  Puedes disfrutar de nuestros restaurantes y puestos de comida dentro del balneario.`;
    }

    if (
      lower.includes('Restaurantes') 
      && lower.includes('venden')
    ) {
    return `🍽️ *Opciones de comida dentro del balneario*:
  - Antojitos mexicanos
  - Comida corrida
  - Hamburguesas y snacks
  - Bebidas frescas y jugos naturales`;
    }

    if (
      lower.includes('wifi') || 
      lower.includes('señal')) {
      return `📶 *Conectividad*:
  - Hay señal telefónica en la mayoría del balneario.
  - Contamos con zonas con WiFi gratuito cerca de la entrada y restaurante.`;
    }

    if (
      lower.includes('plan familiar') || 
      lower.includes('promoción')) {
      return `🎁 *Promociones y planes familiares*:
  - Paquete familiar (2 adultos + 2 menores): $450 MXN
  - Promociones especiales en vacaciones y fines de semana largos.`;
    }

    if (
      lower.includes('locker')
    ) {
      return `🔒 *Lockers disponibles*:
  - Renta de locker: $30 MXN por día
  - Puedes guardar objetos personales y llaves.`;
    }

    if (
      lower.includes('transporte') || 
      lower.includes('cómo llegar')
    ) {
      return `🚌 *Cómo llegar al Balneario Santa Ana*:
  - Desde Tulancingo: taxi o colectivo (15 minutos)
  - Desde CDMX: autobús a Tulancingo y luego taxi
  - En auto: carretera México-Tuxpan, salida Santa Ana.`;
    }

    if (
      lower.includes('tienda')|| 
      lower.includes('tiendas')
    ) {
      return `🛍️ *Tienda dentro del balneario*:
- Trajes de baño, sandalias, bloqueador, juguetes acuáticos
- Precios desde $50 hasta $400 MXN`;
    }

    if (
      lower.includes('cabaña')|| 
      lower.includes('cabañas')
    ) {
      return `🏕️ *Cabañas*:
  - Rústicas para 4 personas: $800 MXN
  - Familiares para 6 personas: $1200 MXN
  - Incluyen baño privado, ventilador y camas`;
    }

    if (
      lower.includes('hotel') || 
      lower.includes('habitacion')|| 
      lower.includes('habitaciones')
    ) {
      return `🏨 *Hotel del Balneario*:
  - Habitación sencilla: $700 MXN
  - Habitación doble: $950 MXN
  - Incluyen baño privado, ventilador, televisión.`;
    }

    if (
      lower.includes('camping')|| 
      lower.includes('campamento')
    ) {
      return `⛺ *Área de Camping*:
  - Acceso: $100 MXN por persona
  - Incluye uso de baños y regaderas
  - Lleva tu propia tienda de campaña.`;
    }
    return 'Lo siento, no encontré información sobre eso. ¿Podrías reformular tu pregunta?';

  }
  public async getVideosTiktok(): Promise<any[]> {
    const res = await fetch('http://localhost:3002/google-search?q=site:tiktok.com balneario santa ana tulancingo');
    const data = await res.json();
  
    return data
      .filter((v: any) => v.url.includes('/video/'))
      .map((v: any) => {
        const videoId = v.url.split('/video/')[1]?.split('?')[0];
        return {
          title: v.title,
          url: v.url,
          videoId: videoId
        };
      });
  }

  
} 

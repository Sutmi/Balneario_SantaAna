// Importa los decoradores y tipos necesarios desde Angular
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Define una nueva pipe llamada "safe"
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
   // DomSanitizer es un servicio que permite marcar contenido como seguro para evitar errores de seguridad
  constructor(private sanitizer: DomSanitizer) {}
    // Transforma una URL insegura en una segura para ser usada en atributos como [src] o [href]
  transform(url: string): SafeResourceUrl {
        // Marca explícitamente la URL como segura (confías en esta URL)
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

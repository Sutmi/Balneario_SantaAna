import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initCarousel();
    }
  }

  initCarousel() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function updateCarousel(index: number) {
      const offset = -index * (carousel.children[0] as HTMLElement).offsetWidth;
      carousel.style.transform = `translateX(${offset}px)`;
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    }

    // ✅ Movimiento con indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel(currentIndex);
      });
    });

    // ✅ Movimiento automático cada 3 segundos
    setInterval(() => {
      currentIndex = (currentIndex + 1) % indicators.length;
      updateCarousel(currentIndex);
    }, 3000);
  }
}

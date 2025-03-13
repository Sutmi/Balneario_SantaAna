import { ChatbotComponent } from './chatbot/chatbot.component';
import { FooterComponent } from './footer/footer.component';
import { Formulario2Component } from './formulario2/formulario2.component';
import { FormularioComponent } from './formulario/formulario.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GraciasComponent } from './gracias/gracias.component';
import { LocationComponent } from './location/location.component';
import { PackagesComponent } from './packages/packages.component';
import { ServicesComponent } from './services/services.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: HeaderComponent }, // Página principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ServicesComponent } from './services/services.component';
import { LocationComponent } from './location/location.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FooterComponent } from './footer/footer.component';
import { PackagesComponent } from './packages/packages.component';
import { FormularioComponent } from './formulario/formulario.component';
import { Formulario2Component } from './formulario2/formulario2.component';
import { GraciasComponent } from './gracias/gracias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroSectionComponent,
    ServicesComponent,
    LocationComponent,
    FooterComponent,
    PackagesComponent,
    FormularioComponent,
    Formulario2Component,
    GraciasComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GalleryComponent,
    ReactiveFormsModule,
    FormsModule,
    ChatbotComponent
],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

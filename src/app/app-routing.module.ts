import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormularioComponent } from './formulario/formulario.component';


const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent }, // Página principal
  { path: 'Reservaciones', component: FormularioComponent }, // ruta para el formulario
  { path: '**', redirectTo: 'Home' }  // Redirigir cualquier ruta incorrecta a 'Home'

];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { scrollPositionRestoration: 'enabled', 
      anchorScrolling: 'enabled', 
      useHash: false 
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


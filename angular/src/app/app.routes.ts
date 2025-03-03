import { Routes } from '@angular/router';
import { IndexComponent } from './components/paginas/public/index/index.component';
import { ContactoComponent } from './components/paginas/public/contacto/contacto.component';
import { EquipoComponent } from './components/paginas/public/equipo/equipo.component';
import { ServiciosComponent } from './components/paginas/public/servicios/servicios.component';
import { AcercaDeComponent } from './components/paginas/public/acerca-de/acerca-de.component';

export const routes: Routes = [
    {path:'', redirectTo: 'inicio', pathMatch: 'full'}, //Ruta por defecto
    {path:'inicio', component: IndexComponent},
    {path:'equipo', component: EquipoComponent},
    {path:'servicios', component: ServiciosComponent},
    {path:'contacto', component: ContactoComponent},
    {path:'acercaDe', component: AcercaDeComponent},
];

import { Routes } from '@angular/router';
import { IndexComponent } from './components/paginas/public/index/index.component';
import { ContactoComponent } from './components/paginas/public/contacto/contacto.component';
import { EquipoComponent } from './components/paginas/public/equipo/equipo.component';
import { ServiciosComponent } from './components/paginas/public/servicios/servicios.component';
import { AcercaDeComponent } from './components/paginas/public/acerca-de/acerca-de.component';
import { LoginComponent } from './components/paginas/public/login/login.component';
import { LayoutComponent } from './components/paginas/public/layout/layout.component';
import { AdminComponent } from './components/paginas/private/admin/admin.component';
import { RegisterComponent } from './components/paginas/public/register/register.component';
import { authGuard } from './components/paginas/private/auth.guard';

export const routes: Routes = [
    {path:'', redirectTo: 'inicio', pathMatch: 'full'}, //Ruta por defecto
    {path:'login', component: LoginComponent},
    {path:'', component: LayoutComponent, children: [
        //Aquí van las páginas que se podrán ver al estar loggeado.
        {path:'admin', component: AdminComponent, canActivate: [authGuard]},
    ] },
    {path:'inicio', component: IndexComponent},
    {path:'equipo', component: EquipoComponent},
    {path:'servicios', component: ServiciosComponent},
    {path:'contacto', component: ContactoComponent},
    {path:'acercaDe', component: AcercaDeComponent},
    {path:'register', component: RegisterComponent},
];

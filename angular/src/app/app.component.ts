import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ContactoComponent } from "./components/contacto/contacto.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IndexComponent, ServiciosComponent, ContactoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular';
}

import { Component } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { ParallaxComponent } from "../../../parallax/parallax.component";
import { ComentariosComponent } from '../comentarios/comentarios.component';

@Component({
  selector: 'app-servicios',
  imports: [ParallaxComponent, HeaderComponent, FooterComponent, ComentariosComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

}

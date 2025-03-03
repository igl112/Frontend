import { Component } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { ParallaxComponent } from "../../../parallax/parallax.component";
import { ComentariosComponent } from '../../../comentarios/comentarios.component';
import { HeadComponent } from '../../../../head/head.component';

@Component({
  selector: 'app-servicios',
  imports: [ParallaxComponent, HeaderComponent, FooterComponent, ComentariosComponent, HeadComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

}

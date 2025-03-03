import { Component } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { ParallaxComponent } from "../../../parallax/parallax.component";
import { HeadComponent } from '../../../../head/head.component';

@Component({
  selector: 'app-equipo',
  imports: [HeaderComponent, FooterComponent, ParallaxComponent, HeadComponent],
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {

}

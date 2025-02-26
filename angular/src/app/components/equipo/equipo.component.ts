import { Component } from '@angular/core';
import { HeaderComponent} from '../header/header.component';
import { FooterComponent} from '../footer/footer.component';
import { ParallaxComponent} from '../parallax/parallax.component';

@Component({
  selector: 'app-equipo',
  imports: [HeaderComponent, FooterComponent, ParallaxComponent],
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {

}

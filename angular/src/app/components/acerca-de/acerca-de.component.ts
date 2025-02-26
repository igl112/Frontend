import { Component } from '@angular/core';
import { HeaderComponent} from '../header/header.component';
import { FooterComponent} from '../footer/footer.component';
import { ParallaxComponent} from '../parallax/parallax.component';

@Component({
  selector: 'app-acerca-de',
  imports: [HeaderComponent, FooterComponent, ParallaxComponent],
  templateUrl: './acerca-de.component.html',
  styleUrl: './acerca-de.component.css'
})
export class AcercaDeComponent {

}

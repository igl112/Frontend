import { Component } from '@angular/core';
import { HeaderComponent} from '../header/header.component';
import { FooterComponent} from '../footer/footer.component';
import { ParallaxComponent} from '../parallax/parallax.component';

@Component({
  selector: 'app-comentarios',
  imports: [HeaderComponent, FooterComponent,ParallaxComponent],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {

}

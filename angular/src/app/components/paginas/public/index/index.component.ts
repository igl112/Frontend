import { Component } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { ParallaxComponent } from "../../../parallax/parallax.component";

@Component({
  selector: 'app-index',
  imports: [HeaderComponent, FooterComponent, ParallaxComponent], //importar footer, header y fondo
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}

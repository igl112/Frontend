import { Component } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { ParallaxComponent } from "../../../parallax/parallax.component";
import { HeadComponent } from '../../../../head/head.component';

@Component({
  selector: 'app-contacto',
  imports: [HeaderComponent, FooterComponent, ParallaxComponent, HeadComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}

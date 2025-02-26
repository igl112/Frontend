import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { IndexComponent } from './components/index/index.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IndexComponent],
=======
import { HeaderComponent } from './components/header/header.component';
import { ParallaxComponent } from './components/parallax/parallax.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: 
          [
            RouterOutlet, 
            HeaderComponent, 
            ParallaxComponent, 
            FooterComponent
          ],
>>>>>>> devLuz
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular';
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  ApplicationRef,
  Component,
  ElementRef,
  inject,
  Directive,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  viewChild,
} from '@angular/core';
import { AuthService } from '../../services/authService/auth.service';
import { firstValueFrom, skip, take } from 'rxjs';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../services/clientService/client.service';
import { DOCUMENT } from '@angular/common';
import { UpdateData } from '../../interfaces/update-data';

@Component({
  selector: 'app-customer-list-component',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-list-component.component.html',
  styleUrl: './customer-list-component.component.css',
})
export class CustomerListComponentComponent {
  private authService = inject(AuthService);
  private clientService = inject(ClientService);
  private document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private fb = inject(NonNullableFormBuilder); // Usamos NonNullableFormBuilder para garantizar que los valores nunca sean null o undefined.
  clientlist: any[] = [];
  updateArray: any[] = [];

  updateForm = this.fb.group({
    nombre: ['', [Validators.maxLength(255)]],
    apellidos: ['', [Validators.maxLength(255)]],
    nombreUsuario: ['', [Validators.maxLength(255)]],
    provincia: ['', [Validators.maxLength(255)]],
    municipio: ['', [Validators.maxLength(255)]],
    direccion: ['', [Validators.maxLength(255)]],
    tlf: ['', [Validators.maxLength(255)]],
    DNI: ['', [Validators.maxLength(255)]],
    email: ['', [Validators.email]],
    contrasena: ['', [Validators.minLength(6)]],
  });

  filterForm = this.fb.group({
    nombre: ['', [Validators.maxLength(255)]],
    apellidos: ['', [Validators.maxLength(255)]],
    tlf: ['', [Validators.maxLength(255)]],
    DNI: ['', [Validators.maxLength(255)]],
    email: ['', [Validators.maxLength(255)]],
    pagina: ['1', [Validators.required]],
  });

  addForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(255)]],
    apellidos: ['', [Validators.required, Validators.maxLength(255)]],
    nombreUsuario: ['', [Validators.required, Validators.maxLength(255)]],
    Provincia: ['', [Validators.required, Validators.maxLength(255)]],
    municipio: ['', [Validators.required, Validators.maxLength(255)]],
    direccion: ['', [Validators.required, Validators.maxLength(255)]],
    tlf: ['', [Validators.required, Validators.maxLength(255)]],
    DNI: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    contrasena_confirmation: [
      '',
      [Validators.required, Validators.minLength(6)],
    ],
  });

  loadClients() {
    if (this.filterForm.valid) {
      let filterformValue = this.filterForm.value

      const paramsObj = {
        nombre: filterformValue.nombre? filterformValue.nombre : '',
        apellidos: filterformValue.apellidos? filterformValue.apellidos : '',
        tlf: filterformValue.tlf? filterformValue.tlf : '',
        DNI: filterformValue.DNI? filterformValue.DNI : '',
        email: filterformValue.nombre? filterformValue.nombre : '',
        skip: filterformValue.pagina? ((+filterformValue.pagina)*10)-10 : '',
        take: 10
      }

      let params = Object.values(paramsObj);

      console.log(params)
        this.clientService.getClients(params).subscribe((res: any) => {
        this.clientlist = res;
      }); 
    } else {
      alert('Formulario inválido');
    }
  }

  delete(id: number) {
    this.clientService.deleteClient(id).subscribe((res: any) => {
      //todo: hacer esto sin llamada, borrar elemento en front
      this.loadClients();
      alert(res.message);
    });
  }

  showUpdateForm(id: number) {
    this.renderer.setStyle(
      this.document.querySelector('#updateForm' + id),
      'display',
      ''
    );
  }

  async update(id: number) {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      let clientObj = await firstValueFrom(this.clientService.getClient(id));
      let client = Object.values(Object.values(clientObj)[0]);

      const updateData = {
        nombre: formData.nombre ? formData.nombre : client[9],
        apellidos: formData.apellidos ? formData.apellidos : client[1],
        nombreUsuario: formData.nombreUsuario
          ? formData.nombreUsuario
          : client[10],
        provincia: formData.provincia ? formData.provincia : client[5],
        municipia: formData.municipio ? formData.municipio : client[4],
        direccion: formData.direccion ? formData.direccion : client[3],
        tlf: formData.tlf ? formData.tlf : client[2],
        DNI: formData.DNI ? formData.DNI : client[6],
        email: formData.email ? formData.email : client[7],
        contrasena: formData.contrasena ? formData.contrasena : client[8],
        contrasena_confirmation: formData.contrasena
          ? formData.contrasena
          : client[8],
      };

      this.clientService.update(id, updateData).subscribe((res: any) => {
        this.loadClients();
      });

      this.renderer.setStyle(
        this.document.querySelector('#updateForm' + id),
        'display',
        'none'
      );
    } else {
      alert('Formulario inválido');
    }
  }
}

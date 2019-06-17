import { Component, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/store/user.service';
import { UserModel } from 'src/app/model/userModel';
// import { UserModel } from 'src/app/model/userModel';
// import { UserModel} from '../../model/userModel';
// import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DireccionComponent } from '../direccion/direccion.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  @ViewChild('child1') childOne: DireccionComponent;


  user = new UserModel();

  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _serv: UserService,
    private route: ActivatedRoute,
    private rout: Router

  ) {
    this.form = this.fb.group({
      id: new FormControl(null),
      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)//SOLO LETRAS
      ]],
      apellido: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)//SOLO LETRAS
      ]],
      direccion: ['', [
        Validators.required,

      ]],
      correo: ['', [
        Validators.required,
        Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)//SOLO LETRAS
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^([0-9])*$/)
      ]],
      contrasena: ['', [
        Validators.required,
      ]],

    });

  }

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id'); // leer id de el URL  PARA ESO SE USA ESTE METODO
    if (id !== 'nuevo') {
      this._serv.consultaId(id).subscribe(resp => {
        this.user = resp;
        this.form.get('nombre').setValue(this.user.nombre);
        this.form.get('apellido').setValue(this.user.apellido);
        this.form.get('direccion').setValue(this.user.direccion);
        this.form.get('correo').setValue(this.user.correo);
        this.form.get('telefono').setValue(this.user.telefono);
        this.form.get('contrasena').setValue(this.user.contrasena);

      });
      Swal.fire(
        'Editar Usuario',
      );

    }
    this.mostrar();


  }


  guardarUser() {

    if (this.user.id) {
      const user2 = new UserModel();
      user2.id = this.user.id;
      user2.nombre = this.form.get('nombre').value;
      user2.apellido = this.form.get('apellido').value;
      user2.direccion = this.form.get('direccion').value;
      user2.correo = this.form.get('correo').value;
      user2.telefono = this.form.get('telefono').value;
      user2.contrasena = this.form.get('contrasena').value;
      this._serv.actualizar(user2).subscribe(resp => {
        Swal.fire(
          'Actualizo correctamente',
        );
        this.rout.navigate(['/list']);

      });
      setTimeout(() => {

        this.rout.navigate(['/list']);
      }, 1500);
    } else {
      const user = new UserModel();
      user.nombre = this.form.get('nombre').value;
      user.apellido = this.form.get('apellido').value;
      user.direccion = this.form.get('direccion').value;
      user.correo = this.form.get('correo').value;
      user.telefono = this.form.get('telefono').value;
      user.contrasena = this.form.get('contrasena').value;

      this._serv.CrearUserServ(user).subscribe(resp => {
        console.log('guardo');
        Swal.fire(
          'Guardo correctamente',
        );
        setTimeout(() => {

          this.rout.navigate(['/list']);
        }, 1500);
      });

    }



    console.log(this.form);
  }

  change(): void {
    this.childOne.function1();
  }

  mostrar() {

    console.log(this.childOne.function1());


  }

}

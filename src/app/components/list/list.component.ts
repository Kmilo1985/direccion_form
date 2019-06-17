import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/store/user.service';
import { UserModel } from 'src/app/model/userModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {
  user: UserModel[] = [];
  constructor(
    private _serv: UserService
  ) { }

  ngOnInit() {
    this.listarUser();
  }

  listarUser() {
    this._serv.consultarTodas().subscribe(resp => {
      this.user = resp;
    });
  }

  borrarUser(user: UserModel) {
    this._serv.eliminarUser(user).subscribe(resp => {
      Swal.fire(
        'Elimino correctamente',
      );
      this.listarUser();
    });
  }

}

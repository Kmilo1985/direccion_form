import { Injectable } from '@angular/core';
import { UserModel } from '../model/userModel';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { UserModel} from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlServ = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient

  ) { }

  public CrearUserServ(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.urlServ, user);

  }

  public consultarTodas(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.urlServ);
  }

  public consultaId(id: any): Observable<UserModel> {
    return this.http.get<UserModel>(this.urlServ + '/' + id);

  }
  public actualizar(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(this.urlServ + '/' + user.id, user);
  }
  public eliminarUser(user: UserModel): Observable<UserModel> {
    return this.http.delete<UserModel>(this.urlServ + '/' + user.id);

  }
  // public deletePorId(user: UserModel): Observable<UserModel> {
  //   return this.http.delete<UserModel>(this.urlApi + '/' + user.id);
  // }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public selectedUser: User;
  public users: User[];
  public isUserCreated = new BehaviorSubject(null);
  public selectedRow = new BehaviorSubject(null);
  private readonly baseUrl = 'http://localhost:3000/users/';

  constructor(private _http: HttpClient) {
  }

  public postUser(user: User) {
    return this._http.post(this.baseUrl, user);
  }

  public getUsers () {
    return this._http.get(this.baseUrl);
  }

  public userIsCreated(data: {[k: string]: any}) {
    this.isUserCreated.next(data);
  }

  public getSelectedRow(data: {[k: string]: any}) {
    this.selectedRow.next(data);
  }

  public putUser(user: User) {
    return this._http.put(this.baseUrl + `/${user._id}`, user);
  }

  public deleteUser(_id: string) {
    return this._http.delete(this.baseUrl + `/${_id}`);
  }
}

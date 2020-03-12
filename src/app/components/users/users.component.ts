import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { isNull } from 'util';

import { UserInterface } from "../../shared/interfaces/user-interface"

import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['name', 'position', 'country', 'age', 'remove'];
  public dataSource;
  private usersData: User[];
  private rowData;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private _userService: UserService) {
   }

  ngOnInit(): void {
    this.getUsers();
  }

  public removeLine(_id: string) {
    this._userService.deleteUser(_id); debugger
  }

  private getUsers () {
    this._userService.getUsers()
    .pipe(filter(data => !!data))
    .subscribe(users => {
      this.usersData = users as User[];
      this.dataSource = new MatTableDataSource<UserInterface>(this.usersData);
      this.dataSource.paginator = this.paginator;
    })
  }

  public getRecord(data: {[k: string]: any}) {
    this._userService.getSelectedRow(data);
  }

  ngAfterViewInit() {
    this._userService.isUserCreated
    .pipe(filter(data => !!data))
    .subscribe(data => {
      if(!isNull(data)) {
        this.getUsers();
      }
    })
  }
}

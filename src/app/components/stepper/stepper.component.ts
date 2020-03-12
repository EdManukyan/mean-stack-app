import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, take } from 'rxjs/operators';

import { v4 as uuid } from 'uuid';

import { UserService } from './../../shared/services/user.service';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, AfterViewInit {

  public userFormGroup: FormGroup;
  public createSucceded = false;
  public exsitingUserFlag = false;
  private existingRow: {[k: string]: any};

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService) {
    }

  ngOnInit() {
    this.initUserForm();
  }

  public createUser() {
    const formValues = this.userFormGroup.value;
    this._userService.postUser(formValues)
    .pipe(filter(data => !!data))
    .subscribe(data => {
      this._userService.userIsCreated(data);
      this.createSucceded = !this.createSucceded;
    })
    this.userFormGroup.reset();
  }

  public updateUser() {
    const formValues = this.userFormGroup.value;
    this._userService.putUser(formValues)
    .pipe(filter(data => !!data))
    .subscribe(data => {
      this._userService.userIsCreated(data);
    })
    this.userFormGroup.reset();
  }

  private initUserForm() {
    this.userFormGroup = this._formBuilder.group({
      _id: [uuid()],
      name: ['', Validators.required],
      position: ['', Validators.required],
      country: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  private existingForm() {
    this._userService.selectedRow
    .pipe(filter(data => !! data), take(1))
    .subscribe(data => {
      this.exsitingUserFlag = true;
      this.existingRow = data;
      this.userFormGroup.reset();
      this.userFormGroup.setValue({
        _id: this.existingRow._id,
        name: this.existingRow.name,
        position: this.existingRow.position,
        country: this.existingRow.country,
        age: this.existingRow.age
      });
    })
  }

  ngAfterViewInit() {
    this.existingForm();
  }
}

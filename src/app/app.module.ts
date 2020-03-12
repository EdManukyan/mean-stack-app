import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

//Angular Material Modules
import { AngularMaterialModule } from './modules/angular-material/angular-material.module'

//Components
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { StepperComponent } from './components/stepper/stepper.component';

// Services
import { UserService } from './shared/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    StepperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

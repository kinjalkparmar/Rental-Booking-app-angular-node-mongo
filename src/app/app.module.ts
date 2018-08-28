import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { RentalModule} from './rental/rental.module';
import { AuthModule} from '../app/auth/auth.module';
import { AppComponent } from './app.component';
import { HeaderComponent} from './common/header/header.component';
import { RentalComponent } from './rental/rental.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




const routes: Routes =[
  {path: '', redirectTo: '/rentals', pathMatch: 'full'},
  
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
    
  ],
  imports: [
    RentalModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

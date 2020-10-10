import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { DataReducer } from './data.reducer';
import { userReducer } from '../store/reducer/user.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { UpdateProduct } from './details/details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    DetailsComponent,
    AddProductComponent,
    UpdateProduct
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ userName: DataReducer, userModel: userReducer}),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [UpdateProduct],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivityComponent } from './activity/activity.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderResumeComponent } from './order-resume/order-resume.component';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmOrderModalComponent } from './modals/confirm-order-modal/confirm-order-modal.component';
import { CommandComponent } from './command/command.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    AdminComponent,
    ActivityComponent,
    ProductsHomeComponent,
    FooterComponent,
    OrderResumeComponent,
    ConfirmOrderModalComponent,
    CommandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([AppEffects]),
    FormsModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

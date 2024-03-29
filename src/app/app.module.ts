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
import { ProductsComponent } from './products/products.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { FeriasComponent } from './ferias/ferias.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CartComponent,
    AdminComponent,
    ActivityComponent,
    ProductsHomeComponent,
    ProductsComponent,
    FooterComponent,
    OrderResumeComponent,
    ConfirmOrderModalComponent,
    CommandComponent,
    PersonalInfoComponent,
    FeriasComponent,
    ProductDetailsComponent,
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
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

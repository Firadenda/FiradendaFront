import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from "@angular/common/http";
import { ActivityComponent } from './activity/activity.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { FooterComponent } from './footer/footer.component';
import { FeriasComponent } from './ferias/ferias.component';

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
    FeriasComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,  HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

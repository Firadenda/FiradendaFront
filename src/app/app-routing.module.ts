import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { OrderResumeComponent } from './order-resume/order-resume.component';
import { CommandComponent } from './command/command.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import {ProductsComponent} from "./products/products.component";
import {FeriasComponent} from "./ferias/ferias.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cart', component: CartComponent },
  { path: 'command', component: CommandComponent },
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: 'order-resume', component: OrderResumeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'ferias', component: FeriasComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

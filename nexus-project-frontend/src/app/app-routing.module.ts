import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyStoreComponent } from './components/company-store/company-store.component';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { StoreComponent } from './components/store/store.component';
import { EntityGuard } from './entity.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'signIn', component: SigninComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' }},
  { path: 'store', component: StoreComponent, canActivate: [EntityGuard], data: { entity: 'Company' } },
  { path: 'company/:id/products', component: CompanyStoreComponent},
  { path: 'company/:id/products/product-overview/:productId', component: ProductOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

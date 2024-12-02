import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PanelComponent } from './panel/panel.component';
import { NuevoModoComponent } from './nuevo-modo/nuevo-modo.component';
import { validatorLoginGuard } from './guards/validator-login.guard';

export const routes: Routes = [
   
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [validatorLoginGuard] , children:[
        { path: '', redirectTo: 'panel', pathMatch: 'full' },
        { path: 'panel', component: PanelComponent },
        { path: 'crear', component: NuevoModoComponent }
    ] ,},

];

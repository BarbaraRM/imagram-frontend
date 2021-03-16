import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { recuperar } from './recuperar/recuperar.component';
import { cambiarcontra } from './cambiarcontra/cambiarcontra.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { PrincipalModule } from './principal/principal.module';
import { EstadoCuenta } from './estado-cuenta/estado-cuenta.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { OnPublicacion } from './only_publicacion/onpublicacion.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'estadocuenta', component: EstadoCuenta },
    { path: 'recuperar', component: recuperar },
    { path: 'contra', component: cambiarcontra },
    //{ path: 'registrar', component: RegistrarComponent },
    { path: 'confir', component: ConfirmDialogComponent },
    { path: 'registrar', component: RegistrarComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        component: PrincipalComponent,
        children: [{
            path: '',
            loadChildren: './principal/principal.module#PrincipalModule'
        }]
    },
    /*{path: '**', component: PageNotFoundComponent},*/
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: false
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }


/*
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

*/
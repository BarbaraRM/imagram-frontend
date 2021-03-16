import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { Navbar2Component } from './navbar2/navbar2.component'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './chat/chat.component'
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { OnPublicacion } from './only_publicacion/onpublicacion.component';
/*SE CONFIGURA EL NAMESPACES DONDE SE CONECTARA EL SOCKET */
const config: SocketIoConfig = { url: 'http://localhost:5000/notificaciones', options: {} };
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,PickerModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    Navbar2Component,
    RegistrarComponent,

  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


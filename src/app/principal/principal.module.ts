
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
/*Obtenemos las subrutas*/
import { PrincipalRoutes } from './principal.routing';


/*Obtenemos los compoenentes*/
import { PerfilComponent } from '../perfil/perfil.component';
import { HomeComponent } from '../home/home.component';
import { HistoriasComponent } from '../historias/historias.component';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { SugerenciasComponent } from '../sugerencias/sugerencias.component';
import { ChatComponent } from '../chat/chat.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// modal
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BloqueadosComponent } from '../bloqueados/bloqueados.component';
import { Explorar } from '../explorar/explorar.component';
import { OnPublicacion } from '../only_publicacion/onpublicacion.component';
/*SE CONFIGURA EL NAMESPACES DONDE SE CONECTARA EL SOCKET */
const config: SocketIoConfig = { url: 'http://localhost:5000/notificaciones', options: {} };

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PrincipalRoutes),
        FormsModule,
        ReactiveFormsModule,PickerModule,
        NgbModule,
        MatButtonModule,
        MatDialogModule,
        SocketIoModule.forRoot(config),

    ],
    declarations: [
        PerfilComponent,
        HomeComponent,
        SugerenciasComponent,
        HistoriasComponent,
        ConfirmDialogComponent,
        PublicacionComponent,
        ChatComponent,
        BloqueadosComponent,
        Explorar,
        OnPublicacion

    ],
    exports: [],
    entryComponents: []
})

export class PrincipalModule { }
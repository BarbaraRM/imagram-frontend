import { Routes } from '@angular/router';


/*Componentes*/
import { PerfilComponent } from '../perfil/perfil.component';
import { HomeComponent } from '../home/home.component';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { HistoriasComponent } from '../historias/historias.component';
import { SugerenciasComponent } from '../sugerencias/sugerencias.component';
import { ChatComponent } from '../chat/chat.component';
import { confperfil } from '../conf-perfil/conf-perfil.component';
import { UploadPublicacion } from '../upload-publicacion/upload-publicacion.component';
import { Explorar } from '../explorar/explorar.component';
import { BloqueadosComponent } from '../bloqueados/bloqueados.component';
import { OnPublicacion } from '../only_publicacion/onpublicacion.component';


export const PrincipalRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'perfil/:id', component: PerfilComponent },
    { path: 'publicaciones', component: PublicacionComponent },
    { path: 'historias', component: HistoriasComponent },
    { path: 'sugerencias', component: SugerenciasComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'editprofile', component: confperfil },
    { path: 'uploadpub', component: UploadPublicacion },
    { path: 'explorar', component: Explorar },
    { path: 'bloqueados', component: BloqueadosComponent },
    { path: 'publicacion/:id', component: OnPublicacion },












    /* */










    /* */











];

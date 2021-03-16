export interface HistoriaInterface {
    id_historia: string;
    id_user: string;
    fecha_pub: string;
    url_historia: string;
    descripcion: string;
    publicada_por: string;
    url_foto_perfil: string;
    minutos: string;
    visto: string;
    cantvistas: string;
}

export interface ListaHistInterface {
    user: string;
    name: string;
    cantVistos: string;
    listaHistorias: HistoriaInterface[];
}

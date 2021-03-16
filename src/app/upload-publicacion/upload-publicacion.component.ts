import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SesionService } from '../services/sesion.service'
import { Socket } from 'ngx-socket-io';
import { PublicacionesService } from '../services/publicaciones.service'
import { HistoriasService } from '../services/historias.service'
import { Router } from '@angular/router'
import * as $ from 'jquery';
declare var Caman: any;

@Component({
    selector: 'app-up-pub',
    templateUrl: './upload-publicacion.component.html',
    styleUrls: ['./upload-publicacion.component.css']
})
export class UploadPublicacion implements OnInit {
    @Output() onChange: EventEmitter<File> = new EventEmitter<File>();

    constructor(private socket: Socket, private sesionService: SesionService, private historiaService: HistoriasService, private publicacionesService: PublicacionesService, private router: Router) { }

    vc_inputimg;
    vc_id_user;
    vc_img;
    file;
    formdata = new FormData()
    feed;
    historia;
    btn_publicar
    descripcion;
    hexColor;
    canvas2;


    // Carga la imagen para tener una previsualizacion de la misma
    updateSource($event: Event) {

        this.file = $event.target['files'][0];
        if (this.file.type === 'video/mp4') {
            console.log(this.file)
            this.projectVideo(this.file);
            this.vc_inputimg = document.getElementById('vc_inputvideo');
            this.vc_inputimg.style.display = 'block';
            this.vc_inputimg = document.getElementById('vc_inputimg');
            this.vc_inputimg.style.display = 'none';
        }

        if (this.file.type === 'image/jpeg' || this.file.type === 'image/png') {
            this.projectImage(this.file);
            this.vc_inputimg = document.getElementById('vc_inputimg');
            this.vc_inputimg.style.display = 'block';
            this.vc_inputimg = document.getElementById('vc_inputvideo');
            this.vc_inputimg.style.display = 'none';
        }

    }

    // Se usa para eller el archivo desde el input cuando es video
    sourcevideo: string = '';
    projectVideo(file: File) {
        let reader = new FileReader;
        reader.onload = (e: any) => {
            this.sourcevideo = e.target.result;
            this.onChange.emit(file);
        };
        reader.readAsDataURL(file);
    }

    // Se usa para eller el archivo desde el input cuando es imagen
    source: string = '';
    projectImage(file: File) {
        let reader = new FileReader;
        reader.onload = (e: any) => {
            this.source = e.target.result;
            this.onChange.emit(file);
        };
        reader.readAsDataURL(file);
    }

    video;
    ngOnInit() {
        var img = new Image();
        var canvas = document.getElementById("vc_inputimg") as HTMLCanvasElement;
        this.canvas2 = document.getElementById("vc_inputimg") as HTMLCanvasElement;

        var ctx = canvas.getContext("2d");
        var fileName = "";
        this.hexColor = "#ffffff";

        $(document).ready(function () {
            $("#maxrgb-btn").on("click", function (e) {
                this.hexColor = $("#hex-color").val();
                Caman("#vc_inputimg", function () {
                    this.revert(false);
                    this.newLayer(function () {
                        this.fillColor(this.hexColor);
                        this.setBlendingMode("maxrgb");
                    });
                    this.render();
                });
                this.canvas2 = canvas;
            });

            $("#minrgb-btn").on("click", function (e) {
                this.hexColor = $("#hex-color").val();
                Caman("#vc_inputimg", function () {
                    this.revert(false);
                    this.newLayer(function () {
                        this.fillColor(this.hexColor);
                        this.setBlendingMode("minrgb");
                    });
                    this.render();
                });
                this.canvas2 = canvas;
            });

            $("#threshold-btn").on("click", function (e) {
                Caman("#vc_inputimg", function () {
                    this.revert(false);
                    this.threshold(100);
                    this.render();
                });
                this.canvas2 = canvas;
            });

            $("#greyscale-btn").on("click", function (e) {
                Caman("#vc_inputimg", function () {
                    this.revert(false);
                    this.greyscale();
                    this.render();
                });
                this.canvas2 = canvas;
            });

            $("#erased-btn").on("click", function (e) {
                Caman("#vc_inputimg", function () {
                    this.revert(false);
                    this.erased();
                    this.render();
                });
                this.canvas2 = canvas;
            });

            $("#emboss-btn").on("click", function (e) {
                Caman("#vc_inputimg", function () {
                    this.revert(false);
                    this.emboss();
                    this.render();
                });
                this.canvas2 = canvas;
            });

            $("#download-btn").on("click", function (e) {
                var fileExtension = fileName.slice(-4);
                if (fileExtension == ".jpg" || fileExtension == ".png") {
                    var actualName = fileName.substring(0, fileName.length - 4);
                }
                download(canvas, actualName + "-edited.jpg");
            });

            $("#file-input").on("change", function () {
                var file = document.querySelector("#file-input").files[0];
                var reader = new FileReader();

                console.log('imagen', file)

                if (file.type === 'video/mp4') {
                    console.log('es un video')

                    if (file) {
                        fileName = file.name;
                        reader.readAsDataURL(file);

                    }

                    reader.addEventListener(
                        "load",
                        function () {
                            this.video = new Image();
                            this.video.src = reader.result;
                            this.video.onload = function () {

                            };
                        },
                        false
                    );










                }

                //Si es una Imagen utiliza el canvas
                if (file.type === 'image/jpeg') {

                    if (file) {
                        fileName = file.name;
                        reader.readAsDataURL(file);

                    }

                    reader.addEventListener(
                        "load",
                        function () {
                            img = new Image();
                            img.src = reader.result;
                            img.onload = function () {
                                canvas.width = img.width;
                                canvas.height = img.height;
                                ctx.drawImage(img, 0, 0, img.width, img.height);
                                $("#vc_inputimg").removeAttr("data-caman-id");
                            };
                        },
                        false
                    );
                }

            });
        });

        Caman.Event.listen("processStart", function (job) {
            $(".process-message").text("Applying: " + job.name);
        });

        Caman.Pixel.prototype.coordinatesToLocation = Caman.Pixel.coordinatesToLocation;
        Caman.Pixel.prototype.locationToCoordinates = Caman.Pixel.locationToCoordinates;
        Caman.Pixel.prototype.putPixelRelative = function (horiz, vert, rgba) {
            var newLoc;
            if (this.c == null) {
                throw "Requires a CamanJS context";
            }
            newLoc = this.loc + this.c.dimensions.width * 4 * (vert * -1) + 4 * horiz;
            if (newLoc > this.c.pixelData.length || newLoc < 0) {
                return;
            }
            this.c.pixelData[newLoc] = rgba.r;
            this.c.pixelData[newLoc + 1] = rgba.g;
            this.c.pixelData[newLoc + 2] = rgba.b;
            this.c.pixelData[newLoc + 3] = rgba.a;
            return true;
        };
        Caman.Pixel.prototype.putPixel = function (x, y, rgba) {
            var loc;
            if (this.c == null) {
                throw "Requires a CamanJS context";
            }
            loc = this.coordinatesToLocation(x, y, img.width);
            this.c.pixelData[loc] = rgba.r;
            this.c.pixelData[loc + 1] = rgba.g;
            this.c.pixelData[loc + 2] = rgba.b;
            this.c.pixelData[loc + 3] = rgba.a;
            return true;
        };

        Caman.Blender.register("maxrgb", function (rgbaLayer, rgbaParent) {
            return {
                r: rgbaParent.r > 128 ? 255 : rgbaParent.r - rgbaLayer.r,
                g: rgbaParent.g > 128 ? 255 : rgbaParent.g - rgbaLayer.g,
                b: rgbaParent.b > 128 ? 255 : rgbaParent.b - rgbaLayer.b
            };
        });

        Caman.Blender.register("minrgb", function (rgbaLayer, rgbaParent) {
            return {
                r: rgbaParent.r < 128 ? rgbaParent.r + rgbaLayer.r : 0,
                g: rgbaParent.g < 128 ? rgbaParent.g + rgbaLayer.r : 0,
                b: rgbaParent.b < 128 ? rgbaParent.r + rgbaLayer.r : 0
            };
        });

        Caman.Filter.register("emboss", function () {
            this.processKernel("Emboss", [-2, -1, 0, -1, 1, 1, 0, 1, 2]);
        });

        Caman.Filter.register("threshold", function (limit) {
            this.process("threshold", function (rgba) {
                var lumin = 0.2126 * rgba.r + 0.7152 * rgba.g + 0.0722 * rgba.b;
                rgba.r = lumin > limit ? 255 : 0;
                rgba.g = lumin > limit ? 255 : 0;
                rgba.b = lumin > limit ? 255 : 0;
            });
            return this;
        });

        Caman.Filter.register("greyscale", function () {
            this.process("greyscale", function (rgba) {
                var lumin = 0.2126 * rgba.r + 0.7152 * rgba.g + 0.0722 * rgba.b;
                rgba.r = lumin;
                rgba.g = lumin;
                rgba.b = lumin;
            });
            return this;
        });

        Caman.Filter.register("erased", function () {
            this.process("erased", function (rgba) {
                if (Math.random() < 0.25) {
                    rgba.putPixelRelative(2, 2, {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 255
                    });
                }
            });
            return this;
        });

        function download(canvas, filename) {
            var e;
            var lnk = document.createElement("a");

            lnk.download = filename;

            lnk.href = canvas.toDataURL("image/jpeg", 0.8);

            if (document.createEvent) {
                e = document.createEvent("MouseEvents");
                e.initMouseEvent(
                    "click",
                    true,
                    true,
                    window,
                    0,
                    0,
                    0,
                    0,
                    0,
                    false,
                    false,
                    false,
                    false,
                    0,
                    null
                );
                lnk.dispatchEvent(e);
            } else if (lnk.fireEvent) {
                lnk.fireEvent("onclick");
            }
        }
    }

    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

    ActivarFeed() {
        this.feed = document.getElementById('feed');
        this.btn_publicar = document.getElementById('btn_publicar');
        this.feed = this.feed.checked;

        if (this.feed === true || this.historia === true) {
            this.btn_publicar.disabled = false;
        } else {
            this.btn_publicar.disabled = true;
        }
    }

    ActivarHistoria() {
        this.btn_publicar = document.getElementById('btn_publicar');
        this.historia = document.getElementById('historia');
        this.historia = this.historia.checked

        if (this.historia === true || this.feed === true) {
            this.btn_publicar.disabled = false;
        } else {
            this.btn_publicar.disabled = true;
        }
    }

    //descripcion;

    file2;
    PublicarContenido() {
        /*var fileExtension = this.file.name.slice(-4);
        if (fileExtension == ".jpg" || fileExtension == ".png") {
            var img = this.canvas2.toDataURL();
            // Convert Base64 image to binary
            this.file2 = this.dataURItoBlob(img);
            this.formdata.append('form_upload', this.file2, this.file.name);
        } else {
            this.formdata.append('form_upload', this.file, this.file.name);
        }*/




        var fileExtension = this.file.name.slice(-4);
        if (fileExtension == ".jpg" || fileExtension == ".png") {
            var img = this.canvas2.toDataURL();
            // Convert Base64 image to binary
            this.file2 = this.dataURItoBlob(img);
            this.formdata.append('form_upload', this.file2, this.file.name);
        } else {
            this.formdata.append('form_upload', this.file, this.file.name);
        }





        /*var img = this.canvas2.toDataURL();
        // Convert Base64 image to binary
        var file = this.dataURItoBlob(img);
        console.log('publicarcontenido', file)
        this.formdata.append('form_upload', file, this.file.name);*/



        var from_usuario = this.sesionService.getIdCurrentUser();
        this.descripcion = document.getElementById('txt_descripcion');
        var redirigir_publi = false, redirigir_historia = false;

        var to_historia, to_feed;

        if (this.feed === true) {
            to_feed = true
        } else {
            to_feed = false
        }

        if (this.historia === true) {
            to_historia = true

        } else {
            to_historia = false
        }

        //alert('la foto se publicara en las historias: ' + to_historia + ', en el feed: ' + to_feed)

        if (to_feed === true) {
            //alert('se va al feed')
            redirigir_publi = true;

            //this.publicacionesService.EnviarImagen(this.formdata, from_usuario, this.descripcion.value).subscribe(re => {
            this.publicacionesService.EnviarImagen(this.formdata, from_usuario, (this.descripcion.value).toString()).subscribe(respueta => {
                if (respueta.result === true) {
                    this.router.navigate(['home']);
                    //redirigir_publi = true;
                } else {
                    alert('Ha ocurrido un error intentalo de nuevo')
                    this.router.navigate(['home']);
                    //redirigir_publi = false;
                }
            });
        }


        if (to_historia === true) {

            //alert('se va a la historia')
            redirigir_historia = true;

            this.historiaService.EnviarImagen(this.formdata, from_usuario, (this.descripcion.value).toString()).subscribe(respueta => {
                if (respueta.result === true) {
                    this.router.navigate(['home']);
                    //redirigir_historia = true;
                } else {
                    alert('Ha ocurrido un error intentalo de nuevo')
                    this.router.navigate(['home']);
                    //redirigir_historia = false;
                }
            });


        }
    }

}

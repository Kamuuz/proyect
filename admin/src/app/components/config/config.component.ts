import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var iziToast: any;
import { v4 as uuidv4 } from 'uuid';
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

public token;
public config : any = {};
public titulo_cat = '';
public icono_cat = '';
//public file:File= undefined;
public file:  undefined;
public imgSelect  : any | ArrayBuffer;
 // public imgSelect: any | ArrayBuffer =' ';
public url;



  constructor(

    private _adminService : AdminService
  ) {
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
    this._adminService.obtener_config_admin(this.token).subscribe(
      response=>{
        this.config = response.data;
        this.imgSelect = this.url+'obtener_logo/'+this.config.logo;
        console.log(this.config);
        
      },
      error=>{
        console.log(error);
        
      }
    );
   }


  ngOnInit(): void {
  }


  agregar_cat(){
    if (this.titulo_cat && this.icono_cat) {
        this.config.categoria.push({
          titulo: this.titulo_cat,
          icono: this.icono_cat,
          _id: uuidv4()
        });

        this.titulo_cat = '';
        this.icono_cat = '';
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000', 
        class: 'text-danger',
        position: 'topCenter',
        message: 'Debe ingresar un titulo y icono para la categoria'
      });
    }
  }

  actualizar(confForm:any){
    if (confForm.valid) {
      let data = {
        titulo:confForm.value.titulo,
        serie: confForm.value.serie,
        correlativo: confForm.value.correlativo,
        categoria: this.config.categoria,
        logo: this.file 
      }
      this._adminService.actualizar_config_admin("63aa8aca4d1f06c5aa53e3ff",data,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C', 
            class: 'text-success',
            position: 'topCenter',
            message: 'Se actualizo correctamente las configuraciones'
    
          });
        }
      );
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000', 
        class: 'text-danger',
        position: 'topCenter',
        message: 'Complete correctamente el formulario'
      });
    }
  }



  fileChangeEvent(event:any){
    var file : any;
    

    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      console.log(file);
    }else{
      iziToast.show({
        title: 'SUCCESS',
        titleColor: '#1DC74C', 
        class: 'text-success',
        position: 'topCenter',
        message: 'No hay una imagen de envio'

      });
    }
    if (file.size <= 4000000) {
      if (file.type =='image/png' || file.type == 'image/webp'|| file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
        
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        reader.readAsDataURL(file);
        this.file = file;


      }else{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C', 
          class: 'text-success',
          position: 'topCenter',
          message: 'el archivo debe ser una imagen'
  
        });
        $('#input-portada').text('seleccionar imagen');
        this.imgSelect = 'assents/img/01.jpg';
        this.file = undefined;
      }
    }else{
      iziToast.show({
        title: 'SUCCESS',
        titleColor: '#1DC74C', 
        class: 'text-success',
        position: 'topCenter',
        message: 'la imagen no puede superar los 4MB'

      });
      $('#input-portada').text('seleccionar imagen');
      this.imgSelect = 'assents/img/01.jpg';
      this.file = undefined;
    }
    console.log(this.file)
  }

  ngDoCheck(): void {
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
  }


  eliminar_catergoria(idx:any){
    this.config.categoria.splice(idx,1);
  }
}

import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file_item';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';


@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];
  estaSobreElemento: boolean = false;

  constructor(public _cargaService: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this._cargaService.cargarImagenesFirebase(this.archivos);
  }

  pruebaSobreElemento(event){
    console.log(event);
    
  }
}

import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file_item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();


  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    this.mouseSobre.emit(false);

    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }

    this._extraerArchivos(transferencia.files)
    this._prevenirDetener(event);

  }


  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.original.dataTransfer
  }

  private _extraerArchivos(archivosLista: FileList) {

    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTmp = archivosLista[propiedad];
      if (this._verificarCargar(archivoTmp)) {
        const nuevoArchivo = new FileItem(archivoTmp);
        this.archivos.push(nuevoArchivo);
        console.log(this.archivos);

      }
    }
  }
  // Validaciones

  private _verificarCargar(archivo: File): boolean {
    if (!this._verificarDroppeado(archivo.name) && this._verificaImagen(archivo.type)) {
      return false;
    } else {
      return true;
    }

  }
  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _verificarDroppeado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log(`El archivo ${nombreArchivo} ya fue agregado`);
        return true;
      }
    }
    return false;
  }

  private _verificaImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('images')
  }

}
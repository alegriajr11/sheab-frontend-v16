import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CriteriosAtencionInmediataDto } from 'src/app/models/Resolucion/GrupoAtencionInmediata/criterios-atencion-inmediata.dto';
import { EstandarAtencionInmediataDto } from 'src/app/models/Resolucion/GrupoAtencionInmediata/estandar-atencion-inmediata.dto';
import { ServicioAtencionInmediataDto } from 'src/app/models/Resolucion/GrupoAtencionInmediata/servicio-atencion-inmediata.dto';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-atencion-inmediata',
  templateUrl: './atencion-inmediata.component.html',
  styleUrls: ['./atencion-inmediata.component.css']
})
export class AtencionInmediataComponent {

  public page: number = 1;
  searchText: any;

  listaVacia: any = undefined;

  servicios_atencion_inmediata: ServicioAtencionInmediataDto[];
  estandar_atencion_inmediata: EstandarAtencionInmediataDto[];
  criterios_atencion_inmediata: CriteriosAtencionInmediataDto[];


  nombre_estadar: string

  nombre_prestador: string

  //ID DE EVALUACION CREADA
  eva_id: number

  selectedStandard: string = '';
  selectedServicio: string = '';

  //ESTADO DEL ESTANDAR
  selectedStandardState: string = '';


  //ID DEL GRUPO
  id_grupo_atencion_inmediata: number

  public modalRef: BsModalRef;


  constructor(
    public sharedService: SharedServiceService,
    private modalService: BsModalService,
  ) { }

  
  ngOnInit(): void{
    this.id_grupo_atencion_inmediata =  this.sharedService.id_grupo_atencion_inmediata
    this.capturarNombrePrestador()
  }

  cargarServicios() {

  }

  cargarCriterios() {

  }

  capturarNombrePrestador() {
    this.nombre_prestador = localStorage.getItem('nombre-pres-verificacion')
  }

  // Método que se activa al cambiar la selección del estándar
  onStandardChange() {
    const selectedStandardObj = this.estandar_atencion_inmediata.find(standard => standard.atencion_id.toString() === this.selectedStandard);
    this.nombre_estadar = selectedStandardObj ? selectedStandardObj.atencion_nombre_estandar : '';
  }

  //ESTABLECER LOS COLORES POR CUMPLIMIENTO
  getClassForCriterio(criterio: any): string {
    if (this.sharedService.criteriosConsultaExternaGuardados.includes(criterio.criext_id)) {
      return 'btn-success';
    }
    return 'btn-outline-dark';
  }

    //ABRIR MODAL PARA ASIGNAR CUMPLIMIENTO
    openModal(modalTemplate: TemplateRef<any>, cris_id: number, eva_id: number) {
      // this.sharedService.setIdEvaluacionVerificacion(eva_id)
      // this.sharedService.setIdCriterioTodosServicios(cris_id)
      this.modalRef = this.modalService.show(modalTemplate,
        {
          class: 'modal-dialogue-centered modal-md',
          backdrop: true,
          keyboard: true
        }
      );
    }
}

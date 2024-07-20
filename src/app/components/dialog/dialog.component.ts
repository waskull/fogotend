import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  formModal: any;
  @Input() header:string = "";
  @Input() message:string = "";
  @Input() row:any;
  @Input() showOnly:boolean = false;
  @Input() clientCancel:boolean = false;
  @Input() logout:boolean = false;
  @Input() userConfirm:boolean = false;
  @Input() isTable:boolean = false;
  @Input() id:number = 1;
  @Output() emitData = new EventEmitter<any>();
  @Input() delete: boolean = false;
  emit() {
    this.emitData.emit(this.row);
  }
  emitLogout(){
    this.emitData.emit({res:true});
  }
}

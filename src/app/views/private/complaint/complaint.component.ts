import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ComplaintService } from '../../../services/complaint.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TableComponent } from '../../../components/table/table.component';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
  selector: 'app-complaint',
  standalone: true,
  imports: [DatePipe, HeaderComponent, ModalComponent, TableComponent],
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.scss'
})
export default class ComplaintComponent {
  columnNames = ['idd','tipo de reclamo','descripción','cliente','nota','estado','Fecha del reclamo']
  columns = ['idd','type','description','client','note','complaintStatus', 'date'];
  op = {delete:true,edit:false, show:true};
  datepipe = new DatePipe('en-US');
  complaintList: any[] = [];
  complaintService = inject(ComplaintService);
  authService = inject(AuthService);
  filter:string = 'all';
  @ViewChild('all', { static: false }) allbtn: ElementRef;
  setFilter(filter:string):void{
    this.filter = filter;
    this.loadData();
  }
  ngOnInit(): void {
    this.authService.setModuleName('Recomendaciones');    
    this.loadData();
  }
  loadData(){
    this.complaintList= [];
    this.complaintService.getAllByFiltering(this.filter).subscribe(res => {  
      res.forEach(e => {
        this.complaintList.push({
          client: e?.user?.firstname ? `${e?.user?.firstname} ${e?.user?.lastname}`: null,
          type:e?.type,
          note: e?.note,
          complaintStatus: e?.complaintStatus,
          revised: e?.revised,
          revisedBy: e?.revisedBy,
          user: e?.user,
          description:e?.description,
          date: this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a'),
          id: e.id,
          idd: e.id < 10 ? `#0${e.id}` : `#${e.id}`,
        });
      });
    
    });
  }
  edit(data: any){
    this.loadData();
  }
  delete(data: any){
      this.complaintService.delete(data.id).subscribe((res) => {
        this.loadData();
      });
  }
  newValue(data: any){
    // this.reload();
    this.allbtn.nativeElement.click(); 
  }
  cancel(id: number){
    
    this.loadData();
  }
  confirm({complaint, id}:{id:number,complaint:any}){
    this.complaintService.update(complaint,id).subscribe((res) => {
      this.loadData();
    });
  }

  reload(){
    this.loadData();
  }

}

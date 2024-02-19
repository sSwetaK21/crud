import { Component, OnInit ,ViewChild, numberAttribute} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpaddComponent } from './components/empadd/empadd.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDelComponent } from './components/confirm-del/confirm-del.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email','date','radio','select', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog: MatDialog ,public dialog_2: MatDialog, private _empService : EmployeeService){}

  ngOnInit(): void {
    this.getEmployeeList()
  }

  openDialog(){
   const dialogRef= this._dialog.open(EmpaddComponent);
   dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getEmployeeList()
      }
    }
   })
  }

  openConfirmDialog(row:any){
    const dialogRef = this.dialog_2.open(ConfirmDelComponent);
    dialogRef.afterClosed().subscribe( res=>{
      if(res){
        this.deleteEmp(row)
      }
    }

    )
  }


  deleteEmp(row:any){
    this._empService.deleteEmp(row).subscribe({
      next: (res)=>{
        alert("Deleted");
        this.getEmployeeList()
      },
      error:console.log
    })
  }



  openEdit(data:any){
   const dialogRef= this._dialog.open(EmpaddComponent, {
          data
    })

    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList()
        }
      }
     })
  }

  getEmployeeList(){
    this._empService.getEmpList().subscribe({
      next:(res : any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      },
      error: console.log
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}

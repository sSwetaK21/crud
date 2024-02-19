import { Component, Inject, OnInit } from '@angular/core';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';



@Component({
  selector: 'app-empadd',
  templateUrl: './empadd.component.html',
  styleUrls: ['./empadd.component.css']
})
export class EmpaddComponent implements OnInit {
  education : string[] = [
    'Matric',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post-Graduate'
  ]

  myForm !: FormGroup;
  constructor(private fb:  FormBuilder, 
    private dialogRef:MatDialogRef<EmpaddComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
     private emp:EmployeeService){ }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstname:['', Validators.required],
      lastname:'',
      email:['', [Validators.required, Validators.email]],
      date:'',
      radio:'',
      select:''
     
    })

    this.myForm.patchValue(this.data)
    
  }

  OnSubmit(form :FormGroup){
    if(this.myForm.valid){
      if(this.data){
        this.emp.updateEmp(this.data.id, this.myForm.value).subscribe({
          next: (val:any)=>{
            // alert("Employee Updated");
            this.dialogRef.close(true)
  
  
          },
          error:(err:any)=>{
            console.error(err)
          }
        })
      }else{
        this.emp.addEmpData(this.myForm.value).subscribe({
          next: (val:any)=>{
            this.dialogRef.close(true)
  
  
          },
          error:(err:any)=>{
            console.error(err)
          }
        })
      }
    

    }
  }

  onCancel(){
    this.dialogRef.close()

  }

}

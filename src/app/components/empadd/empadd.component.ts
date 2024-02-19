import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  constructor(private fb:  FormBuilder, private dialogRef:MatDialogRef<EmpaddComponent>, private emp:EmployeeService){ }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstname:['', Validators.required],
      lastname:'',
      email:['', [Validators.required, Validators.email]],
      date:'',
      radio:'',
      select:''
     
    })
    
  }

  OnSubmit(form :FormGroup){
    if(this.myForm.valid){
      console.log(this.myForm.value)
      this.emp.addEmpData(this.myForm.value).subscribe({
        next: (val:any)=>{
          alert("employee sucessfull");

        },
        error:(err:any)=>{
          console.error(err)
        }
      })

      this.dialogRef.close()
    }
  }

  onCancel(){
    this.dialogRef.close()

  }

}

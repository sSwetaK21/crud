import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private idCounter: number = 0;

  constructor(private _http:HttpClient) { }

  addEmpData(data:any) : Observable<any>{

    // const newData = { ...data, id: ++this.idCounter }; // Increment the counter to generate ID
    // return this._http.post('http://localhost:3000/employee', newData)

    return this._http.post('http://localhost:3000/employee', data)

  }
  getEmpList() : Observable<any>{
    return this._http.get('http://localhost:3000/employee')
  }

  deleteEmp(id:number): Observable<any>{
    console.log("Deleting employee with ID:", id);
    return this._http.delete(`http://localhost:3000/employee/${id}`)
  }

  updateEmp(id:number, data:any): Observable<any>{
    return this._http.put(`http://localhost:3000/employee/${id}`, data)
  }



}

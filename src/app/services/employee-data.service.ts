import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {   Observable } from 'rxjs';
import { Employee } from './../interfaces/employee';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  BaseUrlApi :string = 'https://67fdf5203da09811b1770ac8.mockapi.io/employment';

  constructor(private _HttpClient:HttpClient) {

   }


  // Get All Employees function
  getAllEmployees():Observable<Employee[]>{
  
      return this._HttpClient.get< Employee[] >(`${this.BaseUrlApi}/employees`);
    }
  // End of Get All Employees function 

  // Get one Employee function
    getOneEmployee(id:string):Observable<Employee>{
      return this._HttpClient.get<Employee>(`${this.BaseUrlApi}/employees/${id}`);
  }
  // End of Get one Employee function 


  // Delete Employee Function 
  deleteOneEmployee(id:string):Observable<any>{
    return this._HttpClient.delete(`${this.BaseUrlApi}/employees/${id}`);
  }
  // End of Delete Employee Function 


  // Add New Employee Function
  AddNewEmployee(data:any):Observable<any>{
    return this._HttpClient.post(`${this.BaseUrlApi}/employees`,{
      // body of the request
      name:data.name,
      email:data.email,
      department:data.department,
      position:data.position,
      salary:data.salary
    }
    )
  }
  // End of Add New Employee Function

  // Update Employee Function
  UpdateEmployee(data:any,id:string):Observable<any>{
    return this._HttpClient.put(`${this.BaseUrlApi}/employees/${id}`,{
      // body of the request
      name:data.name,
      email:data.email,
      department:data.department,
      position:data.position,
      salary:data.salary

    }
    )
  }
  // End of Update Employee Function

}

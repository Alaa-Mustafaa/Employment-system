import { Component , OnInit } from '@angular/core';
import { EmployeeDataService } from '../../services/employee-data.service';
import { Employee } from './../../interfaces/employee';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  page: number = 1;
  Employees: Employee[]=[];
  SearchedName:string=''


  constructor(private _EmployeeDataService:EmployeeDataService){}
 
  ngOnInit():void{
    this.getAllemployees();
  }

  /* Get All Employees */
  getAllemployees(){
    return this._EmployeeDataService.getAllEmployees().subscribe((data)=>{
      this.Employees=data
    })
  }
  /* End of Get All Employees */

}

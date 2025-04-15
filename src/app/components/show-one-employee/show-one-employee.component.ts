import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router ,RouterLink} from '@angular/router';
import { EmployeeDataService } from '../../services/employee-data.service';
import { Employee } from './../../interfaces/employee';



@Component({
  selector: 'app-show-one-employee',
  imports: [RouterLink],
  templateUrl: './show-one-employee.component.html',
  styleUrl: './show-one-employee.component.css'
})
export class ShowOneEmployeeComponent implements OnInit{

  url:any;
  Employee !: Employee ;

  constructor(private _ActivatedRoute:ActivatedRoute,private _EmployeeDataService:EmployeeDataService,private _Router:Router){}

  ngOnInit():void{
    // To Get the id from the url to be send to the function to show one employee
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.url = params.get('id'); 
      

      // Call the function 
      this.getEmployee(this.url)
    });
  }

  /* Show one employee function  */

  getEmployee(id:string){
    return this._EmployeeDataService.getOneEmployee(id).subscribe({
    next:(response)=>{
      this.Employee= response
    }
    })
  }

  /* End of Show one employee function  */

  /* Delete Employee function  */
  deleteEmployee(id:any){

    return this._EmployeeDataService.deleteOneEmployee(id).subscribe({
      next:(response)=>{
         document.getElementById('message-container')!.style.display="flex"

      },
      error:(error)=>{alert(error)}
  
      })
    } 
    /* End of Delete Employee function  */


    /*  */

    UpdateEmployee(id:string){

      this._Router.navigate([`/form/update/${id}`])
      
    }
  
    
  }
 




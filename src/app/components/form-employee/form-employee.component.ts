import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { ReactiveFormsModule,  FormGroup, Validators, FormControl } from '@angular/forms';
import { EmployeeDataService } from '../../services/employee-data.service';
import { ActivatedRoute, RouterLink , Router} from '@angular/router';
import { Employee } from '../../interfaces/employee';


@Component({
  selector: 'app-form-employee',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent implements OnInit{
  url:any;
  employeeId : string=''
  role: any;
  Employee !: Employee ;
  Employees:any;
  Exist:boolean=false;
  
  constructor(private _EmployeeDataService:EmployeeDataService,private _ActivatedRoute:ActivatedRoute
, private _Router:Router
  ){}

  ngOnInit():void{
    // To Get the id and the role (add or update to show the appropriate form )
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.url = params.get('id')  ; 
      this.role = params.get('role'); 

      if(this.role == "update"){
        // Call function to get the employee so we can show his properties in update form
         this.getEmployee(this.url)
      }

      
    });
  }
  getEmployee(id:string){
    return this._EmployeeDataService.getOneEmployee(id).subscribe({
    next:(response)=>{
      this.Employee= response
      this.employeeId=response.id;
     
    }
    })
  }
    // Add Form and its validation
    AddForm:FormGroup=new FormGroup({
     name: new FormControl(null,[Validators.required]),
     email:new FormControl(null,[Validators.required,Validators.email]),
     department: new FormControl(null,[Validators.required]),
     position: new FormControl(null,[Validators.required]),
     salary: new FormControl(null,[Validators.required]) 
      
    })
  // End of Add Form and its validation

      // Update Form and its validation
      UpdateForm:FormGroup=new FormGroup({
        name: new FormControl(null,[Validators.required]),
        email:new FormControl(null,[Validators.required,Validators.email]),
        department: new FormControl(null,[Validators.required]),
        position: new FormControl(null,[Validators.required]),
        salary: new FormControl(null,[Validators.required]) 
         
       })
     // End of Update Form and its validation

  // Add Employee function

  // first get all employees and check for the email ( employee exists or not )
  addEmployee(data:any){
  
    this.getAllemployees();
    this.Exist = this.Employees.some((element: any) => element.email === data.value.email);
   
// if employee is exist => show this to admin
   if(this.Exist){
    document.getElementById('message-container')!.style.display="flex"  ;
    document.getElementById('buttons')!.style.display="none"  ;
    document.getElementById('message-body')!.innerHTML="Your Employee is already Exist";
    // Navigate to 
    setTimeout(() => {
      this._Router.navigate(['/home']);
    }, 3000);
    
   }else{
    // if employee isn't exist => added to the employees list
    this.adding(data.value)

   }
  
  }

  // Adding function to the list
  adding(data:any){
    return this._EmployeeDataService.AddNewEmployee(data).subscribe({
      next:(response)=>{
       this.employeeId=response.id;
       document.getElementById('message-container')!.style.display="flex"  ;
       document.getElementById('message-body')!.innerHTML="Your Employee is added successfully";
      }
      }) 
  }
  // End of Adding function to the list

// End of Add Employee function

// Update Employee 
updateEmployee(data:any){
  return this._EmployeeDataService.UpdateEmployee(data.value,this.Employee.id).subscribe({
    next:(response)=>{
      document.getElementById('message-container')!.style.display="flex"  ;
      document.getElementById('message-body')!.innerHTML="Your Employee is updated successfully";

     },
     error:(err)=>{alert(err)}
  })
      
}
// End of Update Employee 

  /* Get All Employees */
  getAllemployees(){
    return this._EmployeeDataService.getAllEmployees().subscribe((data)=>{
      this.Employees=data
    })
  }
  /* End of Get All Employees */

}

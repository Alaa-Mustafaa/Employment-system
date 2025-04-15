import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './../interfaces/employee';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // search pipe to return all the employees names that include the value we searched about 
  transform(employees: Employee[], SearchedName: string): Employee[] {
    return employees.filter((employee)=>{
      return employee.name.toLowerCase().includes(SearchedName.toLowerCase())
    });
  }

}

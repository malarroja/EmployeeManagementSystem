import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddEmployeeRequest } from '../models/api-models/add-employee-request.model';
import { Employee } from '../models/api-models/employee.model';
import { UpdateEmployeeRequest } from '../models/api-models/update-employee request.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseApiUrl='https://localhost:44358';

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseApiUrl + '/Employee');
  } 

  getEmployee(employeeId: string): Observable<Employee> {
    return this.httpClient.get<Employee>(this.baseApiUrl + '/Employee/' + employeeId);
  }

  updateEmployee(employeeId:string,employeeRequest:Employee):Observable<Employee>
  {
    const updateEmployeeRequest : UpdateEmployeeRequest={
      name: employeeRequest.name,
      dateOfBirth:employeeRequest.dateOfBirth,
      mailID:employeeRequest.mailID,
      phoneNumber:employeeRequest.phoneNumber,
      genderId:employeeRequest.genderId,
      physicalAddress:employeeRequest.address.physicalAddress,
      postalAddress:employeeRequest.address.postalAddress
    }
    return  this.httpClient.put<Employee>(this.baseApiUrl+'/Employee/'+employeeId,updateEmployeeRequest);

  }

  deleteEmployee(employeeId:string):Observable<Employee>{
    return this.httpClient.delete<Employee>(this.baseApiUrl + '/Employee/' + employeeId);
  }

  addEmployee(employeeRequest: Employee) : Observable<Employee>{
    const addEmployeeRequest : AddEmployeeRequest={
      name: employeeRequest.name,
      dateOfBirth:employeeRequest.dateOfBirth,
      mailID:employeeRequest.mailID,
      phoneNumber:employeeRequest.phoneNumber,
      genderId:employeeRequest.genderId,
      physicalAddress:employeeRequest.address.physicalAddress,
      postalAddress:employeeRequest.address.postalAddress
    };

    return this.httpClient.post<Employee>(this.baseApiUrl+'/Employee/add',addEmployeeRequest);



  }

  uploadImage(employeeId: string, file:File): Observable<any>{
    const formData = new FormData();
    formData.append("profileImage",file);

    return this.httpClient.post(this.baseApiUrl + '/Employee/' + employeeId + 
    '/upload-image',
      formData, {
        responseType: 'text'
      }
    );
  }

  getImagePath(relativePath : string) {
    return '${this.baseApiUrl}/${relativePath}';
  }
}


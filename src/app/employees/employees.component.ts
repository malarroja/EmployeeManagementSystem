import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../models/ui-models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[]=[];
  displayedColumns: string[] = ['name', 'dateOfBirth','Gender','phoneNumber', 'mailID','edit'];
  dataSource: MatTableDataSource<Employee>=new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) matpaginator!: MatPaginator
  @ViewChild(MatSort) matSort!: MatSort;
  filterString='';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    //Fetch Employees
    this.employeeService.getEmployees()
      .subscribe(
        (successResponse) => {
          this.employees=successResponse;
          this.dataSource=new MatTableDataSource<Employee>(this.employees);

          if(this.matpaginator){
            this.dataSource.paginator=this.matpaginator;
          }
          if(this.matSort){
            this.dataSource.sort=this.matSort;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }

  filterEmployees()
  {
    this.dataSource.filter= this.filterString.trim().toLowerCase();
  }

}

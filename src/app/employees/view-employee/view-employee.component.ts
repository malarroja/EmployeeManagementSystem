import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/ui-models/employee.model';
import { GenderService } from 'src/app/services/gender.service';
import { EmployeeService } from '../employee.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Console } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employeeId: string | null | undefined;
  employee: Employee =
  {
    id: '',
    name: '',
    dateOfBirth: '',
    mailID: '',
    phoneNumber: 0,
    genderId: '',   
    profileImageUrl: '',
    gender: {
      id: '',
     description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    } 
  };

  isNewEmployee = false;
  header = '';
  displayProfileImageUrl = '';

  genderList: Gender[]= [];
 

  constructor(private readonly employeeService: EmployeeService, 
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackbar:MatSnackBar,
    private router:Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params) =>{
        this.employeeId=params.get('id');

        if(this.employeeId){
          if(this.employeeId.toLowerCase()==='Add'.toLowerCase()){
          // -> new Employee Functionality
          this.isNewEmployee = true;
          this.header='Add New Employee';
          this.setImage();
        }else{
          // -> Existing Employee Functionality
          this.isNewEmployee = false;
          this.header='Edit Employee';
          this.employeeService.getEmployee(this.employeeId)
            .subscribe(
              (successResponse) => {
                this.employee=successResponse;
                this.setImage();
              },
              (errorResponse) => {
                this.setImage();
              }
            );
        }
        this.genderService.getGenderList()
          .subscribe(
            (successResponse) => {
              this.genderList=successResponse;
            }
          );
        }
      }
    );
  }

  onUpdate() :void{
    this.employeeService.updateEmployee(this.employee.id,this.employee)
      .subscribe(
        (successResponse)=>{
          
          //show a notification
          this.snackbar.open('Employee updated successfully',undefined,{
            duration: 2000
          });
        },
        (errorResponse)=>{
          //Log it
        }
      );

  }
  onDelete():void{
    this.employeeService.deleteEmployee(this.employee.id)
    .subscribe(
      (successResponse)=>{
        this.snackbar.open('Employee deleted successfully',undefined,{
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigateByUrl('employees');
          
        }, 2000);
      },
      (errorResponse)=>{
        // Log 

      }
    );
  }
  onAdd(): void{
    this.employeeService.addEmployee(this.employee)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Employee added successfully',undefined,{
            duration: 2000
          });

          setTimeout(() => {
            this.router.navigateByUrl('employees/${successResponse.id}');
            
          }, 2000);
          
        },
        (errorResponse) => {
          //Log

        }
      );
  }

  uploadImage(event : any) : void {
    if(this.employeeId) {
      const file: File = event.target.files[0];
      this.employeeService.uploadImage(this.employee.id,file)
      .subscribe(
        (successResponse) => {
          this.employee.profileImageUrl=successResponse;
          this.setImage();

          //show a notification
          this.snackbar.open('Profile Image updated',undefined,{
            duration: 2000
          });

        },
        (errorResponse) => {

        }
      );

    }

  }


  private setImage() : void{
    if(this.employee.profileImageUrl){
      //fetch the image by url
      this.displayProfileImageUrl = this.employeeService.getImagePath(this.employee.profileImageUrl);
    }else{
      //Display a default 
      this.displayProfileImageUrl = '/assets/OIP.jfif';
    }
  }

}

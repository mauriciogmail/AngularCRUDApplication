import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://localhost:4201";

//var apiUrl = "http://localhost:44370/";
//var apiUrl = "http://192.168.10.10:105";

var httpLink = {
  getAllEmployee: apiUrl + "/api/employee/getAllEmployee",
  getAllEmployees: apiUrl + "/ejemplo",
  deleteEmployeeById: apiUrl + "/api/employee/deleteEmployeeById",
  getEmployeeDetailById: apiUrl + "/api/employee/getEmployeeDetailById",
  saveEmployee: apiUrl + "/api/employee/saveEmployee"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(public webApiService: WebApiService) { 
    this.getAllEmployees();
  }

  public getAllEmployee(): Observable<any> {
    return this.webApiService.get(httpLink.getAllEmployees);
  }
  public getAllEmployees(): Observable<any> {
    return this.webApiService.cargarProductos(httpLink.getAllEmployees);
  }


  public deleteEmployeeById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteEmployeeById + '?employeeId=' + model, "");
  }

  public getEmployeeDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getEmployeeDetailById + '?employeeId=' + model);
  }

  public saveEmployee(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveEmployee, model);
  }
  
}

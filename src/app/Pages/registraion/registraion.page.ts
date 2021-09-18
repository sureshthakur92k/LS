import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {FormControl,FormGroup,Validator,FormBuilder} from '@angular/forms';




@Component({
  selector: 'app-registraion',
  templateUrl: './registraion.page.html',
  styleUrls: ['./registraion.page.scss'],
})
export class RegistraionPage implements OnInit {
  data:any;
  AllState: any=[];
  AllCityByState: any=[];
  AllBlockByCity: any=[];
FirstName="";

  constructor(
    private http:HttpClient,
    public formBuilder: FormBuilder
  ) { }

RegistraionForm=new FormGroup({
  FirstName: new FormControl(''),
  LastName: new FormControl(''),
  FatherName: new FormControl(''),
  GrandFatherName: new FormControl(''),
  Address1:new FormControl(''),
  Address2:new FormControl(''),
  State:new FormControl(''),
  City:new FormControl(''),
  
});
// RegistraionForm: FormGroup;
submitRegistationForm() {
  debugger;
  console.log(this.RegistraionForm.value);
}
  ngOnInit() {
    this.GetAllStateService().subscribe(data=>{
     // console.log("GOT DATA");
     // console.log(data);
      this.AllState=data;
      //return data;
    })

  }
  GetAllStateService()
  {
    return this.http.get("http://localhost:4506/api/GelAllState");
  }
  
  GetAllCityByStateService(StateId :any)
  {
   // debugger;
    var  postData = {
                   "StateId":StateId
              }   
    return this.http.post("http://localhost:4506/api/GetCityByState",postData);
  }
  GetAllBlockByCityService(CityId :any)
  {
   // debugger;
    var  postData = {
                   "CityId":CityId
              }   
    return this.http.post("http://localhost:4506/api/GetBlockByCity",postData);
  }
  GetCityByState(StateId)
  {
    //debugger;
   this.AllCityByState=[];
   console.log(this.AllCityByState.lengtn);
    
    var stateId=StateId.detail.value
    this.GetAllCityByStateService(stateId).subscribe(s=>{
      this.AllCityByState=s;
      this.AllCityByState=this.AllCityByState.recordset;
     //console.log("City data "+JSON.stringify(this.AllCityByState) );
    });
  }
  GetBlockByCity(CityId)
  {
   // debugger;
    var CityId=CityId.detail.value;
    
    this.GetAllBlockByCityService(CityId).subscribe(s=>{
      this.AllBlockByCity=s;
      this.AllBlockByCity=this.AllBlockByCity.recordset;
    // console.log("City data "+JSON.stringify(this.AllBlockByCity) );
    });
  }

}
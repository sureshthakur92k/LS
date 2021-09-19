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
  Block:new FormControl(''),
  
  
});
// RegistraionForm: FormGroup;
RegObje={
  FirstName:"",
  LastName:"",
  FatherName:"",
  GrandFatherName:"",
  Address1:"",
  Address2:"",
  StateName:"",
  cityname:"",
  blockname:""
}
ResetAll()
{
 this.RegistraionForm.reset();
}
submitRegistationForm() {
  debugger;
  // console.log(this.RegistraionForm.value);
  // console.log(this.AllState[this.RegistraionForm.value.State-1].StateName);
  // console.log(this.AllCityByState[this.RegistraionForm.value.City]);

var City=this.AllCityByState.filter(
  City => City.cityid === Number(this.RegistraionForm.value.City));

  var Block=this.AllBlockByCity.filter(
    block => block.blockid === Number(this.RegistraionForm.value.Block));

  

  this.RegObje.FirstName=this.RegistraionForm.value.FirstName;
  this.RegObje.LastName=this.RegistraionForm.value.LastName;
  this.RegObje.FatherName=this.RegistraionForm.value.FatherName;
  this.RegObje.GrandFatherName=this.RegistraionForm.value.GrandFatherName;
  this.RegObje.Address1=this.RegistraionForm.value.Address1;
  this.RegObje.Address2=this.RegistraionForm.value.Address2;
  this.RegObje.StateName=this.AllState[this.RegistraionForm.value.State-1].StateName;
  this.RegObje.cityname=City[0].cityname;
  this.RegObje.blockname=Block[0].blockname
 // debugger;
  this.SaveRegistrationService(this.RegObje).subscribe(d=>{
    var ss=d;
  });
 // console.log (this.RegObje);
  

}

ionViewWillEnter()
{
 // debugger;
  this.ResetAll();
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

  SaveRegistrationService(RegObj :any)
  {
    var obj={
      "FirstName":RegObj.FirstName,
      "LastName":RegObj.LastName,
      "FatherName":RegObj.FatherName,
      "GrandFatherName":RegObj.GrandFatherName,
      "Address1":RegObj.Address1,
      "Address2":RegObj.Address2,
      "State":RegObj.StateName,
      "City":RegObj.cityname,
      "Block":RegObj.blockname
      
    } 
    return this.http.post("http://localhost:4506/api/NewRegistraion",obj);
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

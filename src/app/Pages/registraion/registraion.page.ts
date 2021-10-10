import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';





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
Pass10th:any;
Pass12th:any;
TenthOr12thBardName:any=[];
UniversityName:any=[];
PassingYear10th:any=[];
PersentOf10th:any=[];
ishidden:Boolean;
streamsOf12th:any=[];
streamsOfGradution:any=[];
Gradution:any;
  // constructor(
  //   private http:HttpClient,
  //   public formBuilder: FormBuilder
  // ) { }

  personalDetails!: FormGroup;
  addressDetails!: FormGroup;
  educationalDetails!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;

  constructor(private http:HttpClient,
    private formBuilder: FormBuilder) { }
  ngOnInit() {
   //debugger
    this.ishidden=true;
    this.GetAllStateService().subscribe(data=>{
      // console.log("GOT DATA");
      // console.log(data);
       this.AllState=data;
       //return data;
     })
     this.PassingYear10th=[2000,2001,
      2002,2003,2004,2005,2006,2007,2008,2009,20010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,];
      this.PersentOf10th=[30,35,40,45,50,55,60,65,70,75,80,85,90,95]
     this.streamsOf12th=["Science","Commerce","Arts"];
     this.GetGradutionStream().subscribe(data=>{
      // debugger;
      this.streamsOfGradution=data;
     })
        this.personalDetails = this.formBuilder.group({
            // name: ['', Validators.required],
            // email: ['', Validators.required],
            // phone: ['',Validators.required]
            FirstName: new FormControl(''),
            LastName: new FormControl(''),
            FatherName: new FormControl(''),
            GrandFatherName: new FormControl(''),
            // Address1:new FormControl(''),
            // Address2:new FormControl(''),
            // State:new FormControl(''),
            // City:new FormControl(''),
            // Block:new FormControl(''),
        });

        this.addressDetails = this.formBuilder.group({
          Address1: ['', Validators.required],
          Address2: ['', Validators.required],
          State: ['', Validators.required],
          City: ['', Validators.required],
          Block: ['', Validators.required],
        });

        this.educationalDetails = this.formBuilder.group({
          TenthOr12BoardName: ['', Validators.required],
          PassingYear10th: ['', Validators.required],
          PersentOf10th: ['',Validators.required],
          PassingYear12th: ['', Validators.required],
          PersentOf12th: ['',Validators.required],
          streamsOf12th: ['',Validators.required],
          Gradution: ['',Validators.required],
          streamsOfGradution: ['',Validators.required],
        });
  }

  get personal() { return this.personalDetails.controls; }
  get education() { return this.educationalDetails.controls; }
  get address() { return this.addressDetails.controls; }

  next(){

    if(this.step==1){
          this.personal_step = true;
          if (this.personalDetails.invalid) { return  }
          this.step++
    }

    if(this.step==2){
        this.address_step = true;
        if (this.addressDetails.invalid) { return }
            this.step++;
    }

  }

  previous(){

    this.step--
    if(this.step==1){
      this.personal_step = false;
    }
    if(this.step==2){
      this.education_step = false;
    }
  }

  submit(){
    debugger;
    console.log(this.personalDetails.value);
    console.log(this.addressDetails.value);
    console.log(this.educationalDetails.value);
    var City=this.AllCityByState.filter(
      City => City.cityid === Number(this.addressDetails.value.City));
    
      var Block=this.AllBlockByCity.filter(
        block => block.blockid === Number(this.addressDetails.value.Block));
    
      
    
      this.RegObje.FirstName=this.personalDetails.value.FirstName;
      this.RegObje.LastName=this.personalDetails.value.LastName;
      this.RegObje.FatherName=this.personalDetails.value.FatherName;
      this.RegObje.GrandFatherName=this.personalDetails.value.GrandFatherName;
      this.RegObje.Address1=this.addressDetails.value.Address1;
      this.RegObje.Address2=this.addressDetails.value.Address2;
      this.RegObje.StateName=this.AllState[this.addressDetails.value.State-1].StateName;
      this.RegObje.cityname=City[0].cityname;
      this.RegObje.blockname=Block[0].blockname
     // debugger;
      this.SaveRegistrationService(this.RegObje).subscribe(d=>{
        var ss=d;
      });
     // console.log (this.RegObje);
      
    
    
    if(this.step==3){
      this.education_step = true;
      if (this.educationalDetails.invalid) { return }
    }

  }
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
 this.personalDetails.reset();
}
submitRegistationForm() {
  debugger;
  // console.log(this.RegistraionForm.value);
  // console.log(this.AllState[this.RegistraionForm.value.State-1].StateName);
  // console.log(this.AllCityByState[this.RegistraionForm.value.City]);

var City=this.AllCityByState.filter(
  City => City.cityid === Number(this.personalDetails.value.City));

  var Block=this.AllBlockByCity.filter(
    block => block.blockid === Number(this.personalDetails.value.Block));

  

  this.RegObje.FirstName=this.personalDetails.value.FirstName;
  this.RegObje.LastName=this.personalDetails.value.LastName;
  this.RegObje.FatherName=this.personalDetails.value.FatherName;
  this.RegObje.GrandFatherName=this.personalDetails.value.GrandFatherName;
  this.RegObje.Address1=this.personalDetails.value.Address1;
  this.RegObje.Address2=this.personalDetails.value.Address2;
  this.RegObje.StateName=this.AllState[this.personalDetails.value.State-1].StateName;
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
  // ngOnInit() {
    
  //   this.GetAllStateService().subscribe(data=>{
  //    // console.log("GOT DATA");
  //    // console.log(data);
  //     this.AllState=data;
  //     //return data;
  //   })

  // }
  GetAllStateService()
  {
    return this.http.get("http://localhost:4506/api/GelAllState");
  }
  Get10thOr12thBardName()
  {
    return this.http.get("http://localhost:4506/api/Get10thOr12thBardName");
  }

  GetUniversity()
  {
    return this.http.get("http://localhost:4506/api/GetUniversity");
  }
  GetGradutionStream()
  {
    //debugger;
    return this.http.get("http://localhost:4506/api/GetGradutionStream");
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

// GetAllStateService()
//   {
//     return this.http.get("http://localhost:4506/api/GelAllState");
//   }

//   GetAllCityByStateService(StateId :any)
//   {
//    // debugger;
//     var  postData = {
//                    "StateId":StateId
//               }   
//     return this.http.post("http://localhost:4506/api/GetCityByState",postData);
//   }

//   SaveRegistrationService(RegObj :any)
//   {
//     var obj={
//       "FirstName":RegObj.FirstName,
//       "LastName":RegObj.LastName,
//       "FatherName":RegObj.FatherName,
//       "GrandFatherName":RegObj.GrandFatherName,
//       "Address1":RegObj.Address1,
//       "Address2":RegObj.Address2,
//       "State":RegObj.StateName,
//       "City":RegObj.cityname,
//       "Block":RegObj.blockname
      
//     } 
//     return this.http.post("http://localhost:4506/api/NewRegistraion",obj);
//   }
//   GetAllBlockByCityService(CityId :any)
//   {
//    // debugger;
//     var  postData = {
//                    "CityId":CityId
//               }   
//     return this.http.post("http://localhost:4506/api/GetBlockByCity",postData);
//   }
//   GetCityByState(StateId)
//   {
//     //debugger;
//    this.AllCityByState=[];
//    console.log(this.AllCityByState.lengtn);
    
//     var stateId=StateId.detail.value
//     this.GetAllCityByStateService(stateId).subscribe(s=>{
//       this.AllCityByState=s;
//       this.AllCityByState=this.AllCityByState.recordset;
//      //console.log("City data "+JSON.stringify(this.AllCityByState) );
//     });
//   }
//   GetBlockByCity(CityId)
//   {
//    // debugger;
//     var CityId=CityId.detail.value;
    
//     this.GetAllBlockByCityService(CityId).subscribe(s=>{
//       this.AllBlockByCity=s;
//       this.AllBlockByCity=this.AllBlockByCity.recordset;
//     // console.log("City data "+JSON.stringify(this.AllBlockByCity) );
//     });
//   }

onChangeHandler(event)
{
 //debugger;
  var val=event.target.value;

  if(val ==="Non10Th")
  {
    this.Pass10th=0;
    
  }
  else{
    this.Pass10th=1;
    this.ishidden=false;
    this.Get10thOr12thBardName().subscribe(data=>{
       this.TenthOr12thBardName=data;
     })
  }
}

onChangeHandler12th(event)
{
  //debugger;
  var val=event.target.value;
  this.Pass12th=1;
  this.ishidden=false;
  this.Get10thOr12thBardName().subscribe(data=>{
     this.TenthOr12thBardName=data;
   })
}
onChangeHandlerGradution(event)
{
//debugger;
var val=event.target.value;
this.Gradution=1;
this.ishidden=false;
this.GetUniversity().subscribe(data=>{
   this.UniversityName=data;
 });
 
 
}
}

  
  
  

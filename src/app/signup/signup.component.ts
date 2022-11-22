import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeServiceService } from '../home/home-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  SignUpForm!:FormGroup;
  nameSelected!:boolean;
  screenNameSelected!:boolean;
  emailSelected!:boolean;
  passwordSelected!:boolean;
  signUpUser!:any;
  successSignUp!:any;
  errorMessage!:any;
  hiddenPassword!:any;

  constructor(private fb:FormBuilder, private homeService:HomeServiceService) { }

  ngOnInit(): void {
    this.nameSelected=true;
    document.getElementById("nameid")?.focus();
    this.SignUpForm = this.fb.group({
      name:['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z ]+[A-Za-z]+$/)]],
      screenName:['',[Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9,'_\-+=@!$%^&*]+$/)]],
      email:['',[Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._\-$]*@[a-zA-Z.]+\.[a-zA-Z]{2,3}$/)]],
      password:['',[Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!#%*?&]{6,10}$/)]]
    });
  }

  

  selected(s:string){
    if(s==='name'){
      this.nameSelected=true;
      this.screenNameSelected=false;
      this.emailSelected=false;
      this.passwordSelected=false;
    } else if(s==='screenName'){
      this.nameSelected=false;
      this.screenNameSelected=true;
      this.emailSelected=false;
      this.passwordSelected=false;
    } else if(s==='email'){
      this.nameSelected=false;
      this.screenNameSelected=false;
      this.emailSelected=true;
      this.passwordSelected=false;
    } else if(s==='password'){
      this.nameSelected=false;
      this.screenNameSelected=false;
      this.emailSelected=false;
      this.passwordSelected=true;
    } else {
      this.nameSelected=false;
      this.screenNameSelected=false;
      this.emailSelected=false;
      this.passwordSelected=false;
    }
  }

  next(){
    const signUpForm={
      "name":this.SignUpForm.controls['name'].value,
      "screenName":this.SignUpForm.controls['screenName'].value,
      "email":this.SignUpForm.controls['email'].value
    }
    this.homeService.signup(signUpForm).subscribe({
      next:(value)=>{
        this.successSignUp="User Registered Successfully";
        this.signUpUser=value[0];
        this.errorMessage=undefined;
      },
      error:(error)=>{
        this.successSignUp=undefined;
        this.signUpUser=undefined;
        this.errorMessage=error?.message;
      }
    });
  }

  passwordHid(){
    this.hiddenPassword =""
    for(let i = 0;i<String(this.SignUpForm.controls['password'].value).length;i++){
      this.hiddenPassword+=".";
    }
  }
}

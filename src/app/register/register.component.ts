import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submit=false;
  formdata = {name:"",email:"",mobile:"",password:""}
  errorMessage=""
  loading=false
  constructor(private auth: AuthService){}

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }
  onSubmit(){
    this.loading=true

    //call register API Services
    this.auth.register(this.formdata.name, this.formdata.email, this.formdata.mobile, this.formdata.password)
    .subscribe({
      next:data=>{
        this.auth.storeToken(data.idToken);
        console.log("Register Token ID =" +data.idToken);
        this.auth.canAuthenticate();
      },
      error:data=>{
        if(data.error.error.message=="INVALID_EMAIL"){
          this.errorMessage="INVALID EMAIL!!"
        }
        else if(data.error.error.message=="EMAIL_EXISTS"){
          this.errorMessage="EMAIL ALREADY EXISTS"
        }
        else{
          this.errorMessage="UNKNOWN ERROR EXISTS PLEASE TRY AGAIN LATER"
        }
      }
    }).add(()=>{
      this.loading=false;
      console.log("Register Completed");
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submit=false;
  formdata = {email:"",password:""}
  errorMessage=""
  loading=false

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }
  onSubmit(){
    
    this.loading=true
    this.auth.login(this.formdata.email, this.formdata.password)
    .subscribe(
      {
        next:data=>{
          this.auth.storeToken(data.idToken);
          console.log("Login Id Token = "+data.idToken)
          this.auth.canAuthenticate();
        },
        error:data=>{
          if(data.error.error.message=="INVALID_EMAIL" || data.error.error.message=="INVALID PASSWORD"){
            this.errorMessage="Invalid Credentials";
          } 
          else{
            this.errorMessage="Unknown Error message while logging in!!"
          }
        }
      }).add(()=>{
        this.loading=false;
        console.log("Login Successfully!!")
      })

  }
}

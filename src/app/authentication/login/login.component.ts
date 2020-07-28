import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthFirebaseService } from '../../providers/auth/auth-firebase.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  
  login: FormGroup;

  loginform = true;
  recoverform = false;
  
  constructor(private fb: FormBuilder, private auth: AuthFirebaseService,private router: Router) { 
    this.createForm();
   }

  ngOnInit(): void {
  }
  get invalidEmail(){
    return this.login.get('email').invalid && this.login.get('email').touched;
  }
  
  get invalidPassword(){
    return this.login.get('password').invalid && this.login.get('password').touched;
  }
  createForm() {
    this.login = this.fb.group({
      email:      ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:   ['',Validators.required],
      rememberMe: ['',]
    });
  }
  
  onlogin(){
    if(this.login.invalid) return;
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Conectando'
    });
    
    Swal.showLoading();

    const user = {
      email:this.login.get('email').value,
      password:this.login.get('password').value
    }
    this.auth.signInWithEmail(user.email,user.password)
      .then((res) => {
        Swal.close();
        this.router.navigate(['/home']);
      }).catch(err =>  Swal.fire({
                            icon:'error',
                            title:'Error al autenticar',
                            text:err
                          })
      );
  }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

}

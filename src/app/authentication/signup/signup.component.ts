import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthFirebaseService } from '../../providers/auth/auth-firebase.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

function passwordMatcher(c: AbstractControl) : {[key: string]: boolean} | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmPassword');
  if (passwordControl.pristine || confirmControl.pristine){
    return null;
  }

  if (passwordControl.value === confirmControl.value){
    return null;
  }
  return {'match':true};
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: FormGroup;
  isCoordinador:boolean=false;
  constructor(private fb: FormBuilder,private auth: AuthFirebaseService,private router: Router) { 
   }

   get invalidName(){
    return this.signup.get('name').invalid && this.signup.get('name').touched;
  }
  
  get invalidEmail(){
    return this.signup.get('email').invalid && this.signup.get('email').touched;
  }
  
  get invalidPassword(){
    return this.signup.get('password').invalid && this.signup.get('password').touched;
  }
  get invalidConfirmPassword(){
    return this.signup.get('confirmPassword').invalid && this.signup.get('confirmPassword').touched;
  }
  get invalidSpecialCode(){
    return this.signup.get('specialCode').invalid && this.signup.get('specialCode').touched;
  }

  

  createForm() {
    this.signup = this.fb.group({
      email:      ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      name:   ['',[Validators.required,Validators.minLength(7)]],
      userRole: ['colaborador',Validators.required],
      passwordGroup: this.fb.group ({
        password:   ['',Validators.required],
        confirmPassword:   ['',Validators.required],
      },{validator: passwordMatcher}),
      specialCode: [''],
      rememberMe: ['',]
    });
  }
  ngOnInit(): void {
    this.createForm();
    this.signup.get('userRole').valueChanges.subscribe(
      value => this.setNotification(value)
    );
  }

  setNotification(userRole: string): void {
    const codeControl = this.signup.get('specialCode');
     if (userRole === 'coordinador') {
      this.isCoordinador = true;
      codeControl.setValidators(Validators.required);
     } else {
      this.isCoordinador = false;
      codeControl.clearValidators();
     }
     codeControl.updateValueAndValidity();
  }

  onsignup(){
    if(this.signup.invalid) return;

    console.log(this.signup);
    console.log(this.signup.get('email').value);


    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Conectando'
    });
    
    Swal.showLoading();


    this.auth.signUpWithEmail(this.signup.get('email').value,this.signup.get('password').value)
      .then((res) => {
        Swal.close();
        this.router.navigate(['/home']);
      }).catch(err =>  Swal.fire({
                            icon:'error',
                            title:'error al autenticar',
                            text:err
                          })
      );
  }
}

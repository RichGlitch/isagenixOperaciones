import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthFirebaseService } from '../../providers/auth/auth-firebase.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user.model';

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
  user:UserModel;

  constructor(private fb: FormBuilder,private auth: AuthFirebaseService,private router: Router) { 
   }

   get invalidName(){
    return this.signup.get('name').invalid && this.signup.get('name').touched;
  }
  
  get invalidEmail(){
    return this.signup.get('email').invalid && this.signup.get('email').touched;
  }
  
  get invalidPassword(){
    return this.signup.get('passwordGroup').errors || 
    ((this.signup.get('passwordGroup.password').touched ||
    this.signup.get('passwordGroup.password').dirty) &&
    !this.signup.get('passwordGroup.password').valid
    )
  }
  get invalidConfirmPassword(){
    return this.signup.get('confirmPassword').invalid && this.signup.get('confirmPassword').touched;
  }
  get invalidSpecialCode(){
    return this.signup.get('specialCode').invalid && this.signup.get('specialCode').touched;
  }

  get invalidPosition(){
    return this.signup.get('position').invalid && this.signup.get('position').touched;
  }
  

  createForm() {
    this.signup = this.fb.group({
      email:      ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      name:   ['',[Validators.required,Validators.minLength(7)]],
      position:   ['',Validators.required],
      role: ['colaborador',Validators.required],
      passwordGroup: this.fb.group ({
        password:   ['',[Validators.required,Validators.minLength(6)]],
        confirmPassword:   ['',[Validators.required,Validators.minLength(6)]],
      },{validator: passwordMatcher}),
      specialCode: ['',],
      rememberMe: ['',]
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.signup.get('role').valueChanges.subscribe(
      value => this.setNotification(value)
    );
  }
  
  specialCodeValidator(control: FormControl){
    var code = control.value;
    console.log(code);
    if(code !== 'abcd')
      return {specialCode:{code:'incorrect'}};
  }
  setNotification(role: string): void {
    const codeControl = this.signup.get('specialCode');
     if (role === 'coordinador') {
      this.isCoordinador = true;
      codeControl.setValidators([Validators.required,this.specialCodeValidator]);
      
     } else {
      this.isCoordinador = false;
      codeControl.clearValidators();
     }
     codeControl.updateValueAndValidity();
  }

  onsignup(){
    if(this.signup.invalid) return;

    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Conectando'
    });
    
    Swal.showLoading();
    
    this.fillUser();

    this.auth.signUpWithEmail(this.user)
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

  fillUser() {
    this.user = {
      displayName:this.signup.get('name').value,
      email:this.signup.get('email').value,
      role:this.signup.get('role').value,
      position:this.signup.get('position').value,
      password:this.signup.get('passwordGroup.password').value
    }
  }
}

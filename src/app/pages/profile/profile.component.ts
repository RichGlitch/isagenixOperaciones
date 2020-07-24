import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../../providers/auth/auth-firebase.service';
import { UserModel } from '../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage'
import { FileModel } from '../../models/file.model';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  

  constructor(private fb: FormBuilder,private auth: AuthFirebaseService,private router: Router, private storage: AngularFireStorage) { }
    user : UserModel = {
      displayName:'',
      email:'',
      photoURL:''
    };
    public currentImage= 'https://api.adorable.io/avatars/285/newUser.png';
    image: FileModel;
    
    profileForm: FormGroup;
    ngOnInit(): void {
      this.createForm();

      this.auth.user.subscribe( user =>{
        this.initFormValues(user);
      });
    }
    createForm() {
      this.profileForm = this.fb.group({
        displayName:      ['',[Validators.required]],
        email:   ['',Validators.required],
        photoUrl: ['',],
      });
    }

    private initFormValues(user:UserModel):void{
    
      if(user.photoURL){
        this.currentImage = user.photoURL;
      }
      this.user = user;
      this.profileForm.patchValue({
        displayName: user.displayName,
        email: user.email,
      });
    }

    onSaveUser(){
      Swal.fire({
        allowOutsideClick: false,
        icon:'success',
        text:'Perfil Actualizado con Éxito',
        showConfirmButton: true,
      });
      
      this.user = this.profileForm.value;
      this.auth.saveProfile(this.user,this.image);
      
    }

    handleImage(e){
      if(e.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(event:any)=>{
          this.currentImage=event.target.result;
        }
        this.image = e.target.files[0];
      }
      //this.image = image;
      
    }
}

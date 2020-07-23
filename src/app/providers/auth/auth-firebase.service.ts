import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserModel } from '../../models/user.model';
import { FileModel } from '../../models/file.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
  public user: Observable<firebase.User | null >;
  private filePath: string;
  
  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) {
    this.user = this.afAuth.authState;
  }
  
  // Obtener el estado de autenticación
  get authenticated():boolean {
    return this.user != null; // True ó False
  }
  
  // Obtener el observador del usuario actual
  get currentUser(): Observable<firebase.User | null> {
    return this.user;
  }
  
  // Registro con email
  signUpWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
    return new Promise((resolve,reject) => {
      this.afAuth.createUserWithEmailAndPassword(email,pass)
      .then(
        userData => resolve(userData),
        err => reject(err)
      )
    });
   }

   // Ingreso con email
   signInWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
    return new Promise((resolve,reject) => {
      return this.afAuth.signInWithEmailAndPassword(email,pass)
      .then(
        userData => resolve(userData),
        err => reject(err)
      )
    });
   }

   // Finalizar sesión
  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  isAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }
  
  saveProfile(user: UserModel, image: FileModel){
    this.uploadImage(user,image);
  }
  
  uploadImage(user: UserModel, image: FileModel) {
    console.log('uploading image.name '+ image.name);
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath,image);
    task.snapshotChanges()
    .pipe(
      finalize (()=>{
        fileRef.getDownloadURL().subscribe( urlImage => {
          console.log('urlimage '+ urlImage);
          console.log('user.photoUrl '+ user.photoURL);
          user.photoURL = urlImage;
          this.updateUser(user);
        })
      })
    ).subscribe();
  }

  updateUser(user: UserModel){
    return this.afAuth.currentUser.then(u => u.updateProfile(
      {
        displayName:user.displayName,
        photoURL: user.photoURL,
      }
    )).then(() => console.log('updated'))
      .catch(err => console.log('error',err));
  }


}

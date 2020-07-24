import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserModel } from '../../models/user.model';
import { FileModel } from '../../models/file.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
  public user: Observable<firebase.User | null >;
  private filePath: string;
  avatar$:BehaviorSubject<any>;

  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) {
    this.user = this.afAuth.authState;
    this.avatar$ = new BehaviorSubject(null);
  }
  
  // Obtener el estado de autenticación
  get authenticated():boolean {
    return this.user != null; // True ó False
  }
  
  getAvatar() {
    return this.avatar$.asObservable();
  }
  
  
  setAvatar(value: any) {
    this.avatar$.next(value);
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
    if(image){
      this.filePath = `images/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath,image);
      task.snapshotChanges()
      .pipe(
        finalize (()=>{
          fileRef.getDownloadURL().subscribe( urlImage => {
            user.photoURL = urlImage;
            this.setAvatar(urlImage);
            this.updateUser(user);
          })
        })
      ).subscribe();
    }
    else 
      this.updateUser(user);
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

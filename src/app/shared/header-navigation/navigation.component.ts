import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthFirebaseService } from '../../providers/auth/auth-firebase.service';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit,OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  currentPhoto = 'https://api.adorable.io/avatars/285/newUser.png';
  user:UserModel={};
  avatar$:any;

  constructor(private modalService: NgbModal,private router: Router,
    private auth: AuthFirebaseService) {}
  
    ngOnInit(): void {
      this.avatar$= this.auth.getAvatar();
      this.auth.user.subscribe( user =>{
        this.user = user;
        console.log('from asf.user');
        console.log(user);

        if(this.user.photoURL)
          this.currentPhoto = this.user.photoURL;
  
          this.auth.setAvatar(this.currentPhoto);
          this.auth.getUserRolAndPosition(user.uid).subscribe(
            user => {
              console.log('user from docs');
              console.log(user);
              this.user = {
                role:{
                  colaborador: user.role==='colaborador',
                  coordinador: user.role==='coordinador',
                },
                position: user.position
              }
            }
          );
      });
      
  }


  onLogOut(){
    this.auth.signOut();
    this.router.navigate(['login']);
  }
  ngAfterViewInit() {}
}

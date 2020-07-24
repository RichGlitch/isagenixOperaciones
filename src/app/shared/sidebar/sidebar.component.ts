import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthFirebaseService } from 'src/app/providers/auth/auth-firebase.service';
import { UserModel } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  currentPhoto = 'https://api.adorable.io/avatars/285/newUser.png';
  avatar$:any;

  user:UserModel={};
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
     
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private auth: AuthFirebaseService,
    private route: ActivatedRoute
  ) {}

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.avatar$ =this.auth.getAvatar();
    this.auth.user.subscribe( user =>{
      this.user = user;
      if(this.user.photoURL)
        this.currentPhoto = this.user.photoURL;
      
        this.auth.setAvatar(this.currentPhoto);
    });
  }

  onLogOut(){
    this.auth.signOut();
    this.router.navigate(['login']);
  }
}

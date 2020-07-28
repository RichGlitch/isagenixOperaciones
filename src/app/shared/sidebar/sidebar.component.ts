import { Component, AfterViewInit, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
export class SidebarComponent implements OnInit{

  showMenu = '';
  showSubMenu = '';
  currentPhoto = 'https://api.adorable.io/avatars/285/newUser.png';
  avatar$:any;

  @Input() user:UserModel={};
  

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
  ) {
    this.avatar$= this.auth.getAvatar();
    this.setUserMenu(this.user.isManager);
    this.sidebarnavItems = this.sidebarOptions.filter(sidebarnavItem => sidebarnavItem);
  }

  sidebarOptions:RouteInfo[];
  // End open close
  ngOnInit() {
   
  }

  onLogOut(){
    this.auth.signOut();
    this.router.navigate(['login']);
  }

  private setUserMenu(isManager:boolean){
    if(isManager)
    this.sidebarOptions=[{
      path: '/home/colaboradores',
      title: 'Colaboradores',
      icon: 'mdi mdi-gauge',
      class: '',
      extralink: false,
      submenu: []
    }];
  else
    this.sidebarOptions=[
      {
        path: '/home/reportes',
        title: 'Reportes',
        icon: 'mdi mdi-gauge',
        class: '',
        extralink: false,
        submenu: []
      }];
  }
}

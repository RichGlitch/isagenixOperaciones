import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthFirebaseService } from '../../providers/auth/auth-firebase.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  
  currentUser$:any;
  user:UserModel={};
  avatar$:any;
  currentPhoto = 'https://api.adorable.io/avatars/285/newUser.png';
  currentuserauth:any;

  constructor(public router: Router,private auth : AuthFirebaseService) { }

  tabStatus = 'justified';

  public isCollapsed = false;

  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;

  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'vertical', // fixed value. shouldn't be changed.
    sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: 'fixed', // two possible values: fixed, absolute
    headerpos: 'fixed', // two possible values: fixed, absolute
    boxed: 'full', // two possible values: full, boxed
    navbarbg: 'skin4', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin5', // six possible values: skin(1/2/3/4/5/6)
    logobg: 'skin5' // six possible values: skin(1/2/3/4/5/6)
  };

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    this.loadCurrentUser();

    if (this.router.url === '/') {
      this.router.navigate(['/home']);
    }

    this.defaultSidebar = this.options.sidebartype;
    this.handleSidebar();
  }

  loadCurrentUser(){
    this.auth.user$.subscribe( user =>{
    this.user = user;
    this.auth.getUserRolAndPosition(user.uid).subscribe(
      user => {
        this.user.manager = user.manager;
        this.user.position= user.position;
        this.user.isManager = user.isManager;
        if(this.user.photoURL)
          this.currentPhoto = this.user.photoURL;
        this.auth.setAvatar(this.currentPhoto);
        this.auth.setCurrentUser(this.user);
        if (this.router.url === '/home/colaboradores' && !this.user.isManager) {
          this.router.navigate(['/home/reportes']);
        }
        
        if (this.router.url === '/home/reportes' && this.user.isManager) {
          this.router.navigate(['/home/colaboradores']);
        }
        }
      );
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: string) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
      case 'iconbar':
        if (this.innerWidth < 1170) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      case 'overlay':
        if (this.innerWidth < 767) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }
  toggleSidebarType() {
    switch (this.options.sidebartype) {
      case 'full':
      case 'iconbar':
        this.options.sidebartype = 'mini-sidebar';
        break;

      case 'overlay':
        this.showMobileMenu = !this.showMobileMenu;
        break;

      case 'mini-sidebar':
        if (this.defaultSidebar === 'mini-sidebar') {
          this.options.sidebartype = 'full';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }
}

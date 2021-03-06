import { Component, AfterViewInit, EventEmitter, Output, OnInit, Input } from '@angular/core';
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
  @Input() user:UserModel={};
  avatar$:any;

  constructor(private modalService: NgbModal,private router: Router,
    private auth: AuthFirebaseService) {}
  
    ngOnInit(): void {
      this.avatar$= this.auth.getAvatar();
  }


  onLogOut(){
    this.auth.signOut();
    this.router.navigate(['login']);
  }
  ngAfterViewInit() {}
}

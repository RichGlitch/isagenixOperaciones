import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../../providers/auth/auth-firebase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  isCoordinador:boolean;
  constructor(
    private router: Router,
    private auth: AuthFirebaseService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    // if(!this.route.snapshot.params.id){
    //   this.auth.user.subscribe( user =>{
    //       this.auth.getUserRolAndPosition(user.uid).subscribe(
    //         user => {
    //           this.isCoordinador = user.role.coordinador;
    //           if(user.role.coordinador)
    //            this.router.navigate(['/home/colaboradores']);
    //         }
    //       );
  
    //   });
    // }
  }

}

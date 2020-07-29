import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../../providers/auth/auth-firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IndicatorsService } from 'src/app/providers/firebase/indicators.service';
import { Indicators } from '../../models/indicator.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  isCoordinador:boolean;
  indicators:Indicators[]=[{}];
  constructor(
    private router: Router,
    private auth: AuthFirebaseService,
    private route: ActivatedRoute,
    private indicatorsService: IndicatorsService) { }

  ngOnInit(): void {
    //console.log(this.route.snapshot.params.id);
    this.auth.user.subscribe( user =>{
      this.indicatorsService.getIndicators().subscribe(val => {
        this.indicators = val;
        this.indicators = this.indicators.filter(s=>s.UserId == user.uid);
      });
    });
    
    // this.indicatorsService.saveIndicatorsList();
    console.log(this.indicators);
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

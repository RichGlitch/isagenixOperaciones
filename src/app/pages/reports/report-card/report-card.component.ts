import { Component, OnInit, Input } from '@angular/core';
import { Indicators } from 'src/app/models/indicator.model';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent implements OnInit {
 @Input() indicator:Indicators;
  weight:string = '' ;
  Q1TextResult:string = '';
  Q2TextResult:string = '';
  Q3TextResult:string = '';
  Q4TextResult:string = '';


  constructor() { }

  ngOnInit(): void {
    this.weight=this.indicator.Weight+'%';
    console.log(this.weight);
  }
  
  setResults(){
    if(this.indicator.Type === 'Cuantitativo')
    {
      if(this.indicator.Flow === 'Forward')
      {
        
      }
    }
  }

}

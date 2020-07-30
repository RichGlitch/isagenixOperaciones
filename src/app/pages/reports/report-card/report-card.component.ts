import { Component, OnInit, Input } from '@angular/core';
import { Indicators } from 'src/app/models/indicator.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndicatorsService } from '../../../providers/firebase/indicators.service';

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
  Q1fg:FormGroup;
  Q2fg:FormGroup;
  Q3fg:FormGroup;
  Q4fg:FormGroup;

  constructor(private fb: FormBuilder,
    private indicatorsService: IndicatorsService) { }

  ngOnInit(): void {
    this.weight=this.indicator.Weight+'%';
    //console.log(this.weight);
    this.createForms();
  }
  
  createForms(){
    this.Q1fg = this.fb.group({
      q1result:['',Validators.required]
    });
    this.Q2fg = this.fb.group({
      q2result:['',Validators.required]
    });
    this.Q3fg = this.fb.group({
      q3result:['',Validators.required]
    });
    this.Q4fg = this.fb.group({
      q4result:['',Validators.required]
    });
  }
  

    
  saveQ1(){
    if(this.Q1fg.invalid) return;
    console.log('guardar q1');
    console.log(this.Q1fg);
    this.indicator.Q1=this.Q1fg.get('q1result').value;
    this.indicatorsService.saveIndicator(this.indicator)
    .then(
      res => console.log('indicador guardado')
    ).catch(
      err=> console.log(err)
    );
  }

  saveQ2(){
    if(this.Q2fg.invalid) return;
    this.indicator.Q2=this.Q2fg.get('q2result').value;
    this.indicatorsService.saveIndicator(this.indicator)
    .then(
      res => console.log('indicador guardado')
    ).catch(
      err=> console.log(err)
    );
  }
  saveQ3(){
    if(this.Q3fg.invalid) return;
    this.indicator.Q3=this.Q3fg.get('q3result').value;
    this.indicatorsService.saveIndicator(this.indicator)
    .then(
      res => console.log('indicador guardado')
    ).catch(
      err=> console.log(err)
    );
  }
  saveQ4(){
    if(this.Q4fg.invalid) return;
    this.indicator.Q4=this.Q4fg.get('q4result').value;
    this.indicatorsService.saveIndicator(this.indicator)
    .then(
      res => console.log('indicador guardado')
    ).catch(
      err=> console.log(err)
    );
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

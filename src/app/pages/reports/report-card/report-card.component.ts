import { Component, OnInit, Input } from '@angular/core';
import { Indicators } from 'src/app/models/indicator.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndicatorsService } from '../../../providers/firebase/indicators.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent implements OnInit {
 @Input() indicator:Indicators;
 @Input() isManager:boolean;
 @Input() isForExport:boolean;
  weight:string = '' ;
  Q1ResultClass:string = 'muted';
  Q2ResultClass:string = 'info';
  Q3ResultClass:string = 'info';
  Q4ResultClass:string = 'info';
  Q1fg:FormGroup;
  Q2fg:FormGroup;
  Q3fg:FormGroup;
  Q4fg:FormGroup;
  
  constructor(private fb: FormBuilder,
    private indicatorsService: IndicatorsService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.weight=this.indicator.Weight+'%';
    
    this.createForms();
    this.Q1ResultClass=this.setResults(this.indicator.Q1);
    this.Q2ResultClass=this.setResults(this.indicator.Q2);
    this.Q3ResultClass=this.setResults(this.indicator.Q3);
    this.Q4ResultClass=this.setResults(this.indicator.Q4);
  }
  
  createForms(){
    this.Q1fg = this.fb.group({
      q1result:[this.indicator.Q1,Validators.required]
    });
    this.Q2fg = this.fb.group({
      q2result:[this.indicator.Q2,Validators.required]
    });
    this.Q3fg = this.fb.group({
      q3result:[this.indicator.Q3,Validators.required]
    });
    this.Q4fg = this.fb.group({
      q4result:[this.indicator.Q4,Validators.required]
    });
  }
  

    
  saveQ1(){
    if(this.Q1fg.invalid) return;
    this.indicator.Q1=this.Q1fg.get('q1result').value;
    this.indicatorsService.saveIndicator(this.indicator)
    .then(
      res => this.toastr.success("Resultado guardado correctamente")
    ).catch(
      err=> this.toastr.error("Hubo un error al guardar, intente más tarde.")
    );
    this.Q1ResultClass=this.setResults(this.indicator.Q1)
  }

  saveQ2(){
    if(this.Q2fg.invalid) return;
    this.indicator.Q2=this.Q2fg.get('q2result').value;
    this.indicatorsService.saveIndicator(this.indicator)
    .then(
      res => this.toastr.success("Resultado guardado correctamente")
    ).catch(
      err=> this.toastr.error("Hubo un error al guardar, intente más tarde.")
    );
    this.Q2ResultClass=this.setResults(this.indicator.Q2)
  }
  saveQ3(){
    if(this.Q3fg.invalid) return;
    this.indicator.Q3=this.Q3fg.get('q3result').value;
    this.indicatorsService.saveIndicator(this.indicator)
    .then(
      res => this.toastr.success("Resultado guardado correctamente")
    ).catch(
      err=> this.toastr.error("Hubo un error al guardar, intente más tarde.")
    );
    this.Q3ResultClass=this.setResults(this.indicator.Q3)
  }
  saveQ4(){
    if(this.Q4fg.invalid) return;
    this.indicator.Q4=this.Q4fg.get('q4result').value;
    this.indicatorsService.saveIndicator(this.indicator)
    .then(
      res => this.toastr.success("Resultado guardado correctamente")
    ).catch(
      err=> this.toastr.error("Hubo un error al guardar, intente más tarde.")
    );
    this.Q4ResultClass=this.setResults(this.indicator.Q4)
  }
  
  setResults(value:any){
    if(!value) return 'muted';
    if(this.indicator.Type === 'Cuantitativo')
    {
      if(this.indicator.Flow === 'Forward')
      {
        if(value < this.indicator.Min)
          return 'danger';
        if(value < this.indicator.Delivers)
          return 'warning';
        if(value < this.indicator.Exceeds)
          return 'success';
        if(value > this.indicator.Exceeds)
          return 'primary';
      }
      if(this.indicator.Flow === 'Reverse')
      {
        if(value > this.indicator.Min)
          return 'danger';
        if(value >= this.indicator.Delivers)
          return 'warning';
        if(value >= this.indicator.Exceeds)
          return 'success';
        if(value < this.indicator.Exceeds)
          return 'primary';
      }
    }
    else{
      if(value==this.indicator.Fails )
        return 'danger';
      if(value == this.indicator.Min)
        return 'warning';
      if(value == this.indicator.Delivers)
        return 'info';
      if(value == this.indicator.Exceeds)
        return 'success';
      if(value == this.indicator.Excellent)
        return 'primary';
    }
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quarter-result',
  templateUrl: './quarter-result.component.html',
  styleUrls: ['./quarter-result.component.css']
})
export class QuarterResultComponent implements OnInit {
  @Input() Qresult:any;
  constructor() { }

  ngOnInit(): void {
  }

}

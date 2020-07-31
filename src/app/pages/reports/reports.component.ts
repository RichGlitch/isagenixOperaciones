import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthFirebaseService } from '../../providers/auth/auth-firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IndicatorsService } from 'src/app/providers/firebase/indicators.service';
import { Indicators } from '../../models/indicator.model';
import { UserModel } from '../../models/user.model';
// import * as jsPDF from 'jspdf'
import * as html2pdf from 'html2pdf.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  isManager:boolean;
  isReportVisible:boolean=false;
  indicators:Indicators[]=[{}];
  colaboradorId:string='';
  user:UserModel;
  today = new Date();
  closeResult = '';
  @ViewChild('reportToExport') htmlData:ElementRef;

  constructor(
    private router: Router,
    private auth: AuthFirebaseService,
    private route: ActivatedRoute,
    private indicatorsService: IndicatorsService,
    private modalService: NgbModal) {
     }
  
  ngOnInit(): void {
    if(this.route.snapshot.params.id){
      this.colaboradorId = this.route.snapshot.params.id;
    }
    
    this.auth.user$.subscribe( user =>{
      
      var id = this.route.snapshot.params.id?this.route.snapshot.params.id:user.uid;
      
      this.auth.getUserRolAndPosition(user.uid).subscribe(
        user=>{
          this.isManager = user.isManager;
        }
    )
      
      this.auth.getUserRolAndPosition(id).subscribe(
          user=>{
            this.user = user;
          }
      )
      this.indicatorsService.getIndicators().subscribe(val => {
        this.indicators = val;
        this.indicators = this.indicators.filter(s=>s.UserId == id);

      });
    });
  }

  generateReport(content2: string) {
		this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

  

  downloadPDF(){
    var element = document.getElementById('exportData');
    var opt = {
      margin:       0,
      filename:     this.user.displayName + '_' + this.today + '.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 1 },
      jsPDF:        { unit: 'in', orientation: 'portrait',format: 'letter' }
    };
    html2pdf().set(opt).from(element).save();
  }

	private getDismissReason(reason: ModalDismissReasons): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
  }
  
  
	openBackDropCustomClass(content3: string) {
		this.modalService.open(content3, { backdropClass: 'light-blue-backdrop' });
	}

	openWindowCustomClass(content3: string) {
		this.modalService.open(content3, { windowClass: 'dark-modal' });
	}

	openSm(content3: string) {
		this.modalService.open(content3, { size: 'sm' });
	}

	openLg(content3: string) {
		this.modalService.open(content3, { size: 'xl' ,backdropClass: 'light-blue-backdrop'});
	}

	openVerticallyCentered(content3: string) {
		this.modalService.open(content3, { centered: true });
	}

}

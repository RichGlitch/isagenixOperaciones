import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { TableService } from './ngtable.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from './ngtable';
import { EmployeesService } from '../employees/employees.service';
import { Employee } from '../../models/employee.model';
import { UsersService } from 'src/app/providers/firebase/users.service';
import { UserModel } from 'src/app/models/user.model';
import { AuthFirebaseService } from '../../providers/auth/auth-firebase.service';
import { Observable } from 'rxjs';


export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1:number, v2:number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string|null;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeader {

  @Input() sortable: string|null=null;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-ngtable',
  templateUrl: './ngtable.component.html',
  styleUrls: ['./ngtable.component.scss']
})
export class TableComponent implements OnInit {

  clientList: UserModel[]=[];
  // clientList = this.tableService.getTable();
  sortClientList:UserModel[]|null=null;
  filterClient:UserModel[]|null=null;
  cfilterClient:UserModel[]|null=null;
  page = 1;
  pageSize = 2;
  editClient: FormGroup=Object.create(null);
  editAddLabel: string = 'Edit';
  clientDetail: Employee |null=null;
  totalLengthOfCollection: number=0;
  userData: Observable<firebase.User>;

  //Sorting purpose...
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>=Object.create(null);

  
  


  constructor(private tableService: EmployeesService, private fb: FormBuilder, private modalService: NgbModal, private userService: UsersService,private auth: AuthFirebaseService) {
    // this.filterClient = this.clientList;
    // this.cfilterClient = this.clientList;
    // this.sortClientList = this.clientList;
    // this.totalLengthOfCollection = this.cfilterClient.length;

  }

  ngOnInit() {
    
    console.log('this.auth.currentUser');
  
    this.auth.user$.subscribe(
      user => {
              if(user)
              {
                console.log(user);
                //this.auth.setCurrentUser(user);
                this.userService.getUsers().subscribe(
                  val => {
                    this.clientList = val;
                    this.clientList = this.clientList.filter(s=>s.manager == user.displayName);
                    this.filterClient = this.clientList;
                    this.cfilterClient = this.clientList;
                    this.sortClientList = this.clientList;
                    this.totalLengthOfCollection = this.cfilterClient.length;
                    console.log(this.clientList);
                  });
              }
          }
    );
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

   // sorting client

    if (direction === '') {
      this.sortClientList = this.clientList;
      this.cfilterClient= this.clientList;
    } else {
      // // //this.sortClientList = [...this.tableService.getTable()].sort((a, b) => {
      // // //  const res = compare(a[column] ,b?[column]);
      // // //  return direction === 'asc' ? res : -res;
      // // //});
      // // //this.cfilterClient = [...this.tableService.getTable()].sort((a, b) => {
      // // //  const res = compare(a[column], b[column]);
      // // //  return direction === 'asc' ? res : -res;
      }  // // //);

    }
  // // //}


  //Searching..........
  _searchTerm: string='';
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filterClient = this.filter(val);
  }

  filter(v: string) {
    return this.clientList.filter(x => x.displayName?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.position?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.email?.toLowerCase().indexOf(v.toLowerCase()) !== -1);
  }

  


  //complete example................
  cpage = 1;
  cpageSize = 4;

  _csearchTerm: string='';
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfilterClient = this.cfilter(val);
    this.totalLengthOfCollection = this.cfilterClient.length;
  }

  cfilter(v: string) {
    return this.clientList.filter(x => x.displayName?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
      x.position?.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.email?.toLowerCase().indexOf(v.toLowerCase()) !== -1);

  }


  //Model........................
  logValidationErrors(group: FormGroup) {
    // Object.keys(group.controls).forEach((key: string) => {
    //   const ac = group.get(key);

    //   this.formsErrors[key] = '';
    //   if (ac && !ac.valid && (ac.touched || ac.dirty)) {
    //     const message = this.ValidationMessage[key];
    //     for (const errorKey in ac.errors) {
    //       if (errorKey) {
    //         this.formsErrors[key] += message[errorKey] + '    ';
    //       }
    //     }
    //   }
    //   if (ac instanceof FormGroup) {
    //     this.logValidationErrors(ac)
    //   }
    // })
  }

  ValidationMessage = {
    fullName: { required: 'full Name is required.' },
    UserName: { required: 'User Name is required.' },
    email: {
      required: 'Email is required.',
      Email: 'Not a email'
    },
  }

  formsErrors = {
  }


}

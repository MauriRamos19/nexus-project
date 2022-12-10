import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  @Input() token:any
  companies:any;
  @Input() entity:any
  constructor(private userServices: UserService) { }

  ngOnInit(): void {
    this.loadCompanies()
  }

  loadCompanies(){
    this.userServices.getAllCompany(this.token).subscribe(res=> {
      this.companies = res;
    })
  }

}

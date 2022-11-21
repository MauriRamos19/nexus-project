import { Component, OnInit } from '@angular/core';
import { faIdCard, faClipboardCheck, faImages, faUsers } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faIdCard = faIdCard
  faClipboardCheck = faClipboardCheck
  faImages = faImages
  faUsers = faUsers
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faMagnifyingGlassLocation } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faGithub = faGithub
  faGoogle = faGoogle
  faMagnifyingGlassLocation = faMagnifyingGlassLocation
  constructor() { }

  ngOnInit(): void {
  }

}

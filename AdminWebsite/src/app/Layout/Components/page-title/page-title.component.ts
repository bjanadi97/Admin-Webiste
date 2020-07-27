import {Component, Input} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent {

  constructor(private api: ApiService, private router: Router) { 

  }

  SignOut(){
    console.log();
    localStorage.removeItem('userToken');
    this.router.navigate(['login'])
  }


  @Input() heading;
  @Input() subheading;
  @Input() icon;

}

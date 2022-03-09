import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-links',
  templateUrl: './dropdown-links.component.html',
  styleUrls: ['./dropdown-links.component.css']
})
export class DropdownLinksComponent implements OnInit {

  @Input() title: string = 'Menu';
  @Input() linkItems: Array<{title: string, link: string, icon: string}> = [
    {
      title: 'Home',
      link: '/admin/dashboard',
      icon: 'zmdi-home'
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  GoToRoute(route: string) {
    this.router.navigate([`${route}`]);
  }

}

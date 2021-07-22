import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/aut.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const rutas: RouteInfo[] = [
    { path: '/app/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/app/user-profile', title: 'Mi Usuario',  icon:'person', class: '' },
    { path: '/app/table-list', title: 'Respuestas',  icon:'content_paste', class: '' },
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userData: any;
  constructor(private _authService: AuthService) { }

  ngOnInit() {

    this.userData = this._authService.getUserData();

    if (this.userData.tipo_usuario === 1) {

      let ruta_admin = { path: '/app/user-list', title: 'Gestion usuarios',  icon:'manage_accounts', class: '' }

      if (!rutas.includes({ path: '/app/user-list', title: 'Gestion usuarios',  icon:'manage_accounts', class: '' })) {
        rutas.push(ruta_admin)
      }


      
    }else {
      
      if (rutas[3]) {
       
        rutas.splice(3, 1)
      }
    }

    this.menuItems = rutas.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logOut(): void {
    this._authService.logOut();
}
}

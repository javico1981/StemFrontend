import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'app/services/common-service';


@Injectable({ providedIn: 'root' })
export class CommonResolver implements Resolve<any> {
  constructor(private service: CommonService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.service.getPacientes();
  }
}
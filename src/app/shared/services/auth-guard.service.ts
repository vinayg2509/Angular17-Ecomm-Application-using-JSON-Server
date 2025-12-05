import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

//* Admin before login check
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem('role');
    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return false;
    }
    return true;
  }
}

//* Admin after login check
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem('role');
    if (role === 'admin') {
      return true;
    }
    this.router.navigate(['/admin-login']);
    return false;
  }
}

//* User before login check (Seller/Buyer)
@Injectable({
  providedIn: 'root',
})
export class SellerBuyerAuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem('role');
    if (role === 'seller') {
      this.router.navigate(['/seller-dashboard']);
      return false;
    } else if (role === 'buyer') {
      this.router.navigate(['/buyer-dashboard']);
      return false;
    }
    return true;
  }
}

//* Seller after login check
@Injectable({
  providedIn: 'root',
})
export class SellerAuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem('role');
    if (role === 'seller') {
      return true;
    }
    this.router.navigate(['/sign-in']);
    return false;
  }
}

//* Buyer after login check
@Injectable({
  providedIn: 'root',
})
export class BuyerAuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem('role');
    if (role === 'buyer') {
      return true;
    }
    this.router.navigate(['/sign-in']);
    return false;
  }
}

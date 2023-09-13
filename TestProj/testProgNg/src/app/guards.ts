import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the user is authenticated (you can implement your own logic here)
    const jwtToken = localStorage.getItem("jwt");
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    // Check if either JWT token or loggedInUser is present to consider the user authenticated
    const isAuthenticated = jwtToken || loggedInUser;

    if (isAuthenticated) {
      return true; // User is authenticated and can access the route
    } else {
      // User is not authenticated, redirect to the homepage or login page
      this.router.navigate(['/']); // Redirect to the homepage
      return false;
    }
  }
}

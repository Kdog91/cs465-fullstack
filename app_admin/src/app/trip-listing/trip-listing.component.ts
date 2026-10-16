import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getTrips();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getTrips(): void {
    this.message = 'Searching for trips...';
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        this.message = value.length > 0 ? '' : 'There were no trips retrieved from the database';
      },
      error: (err: any) => {
        console.error(err);
        this.message = 'Could not load trips. Is the API running?';
      }
    });
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
}
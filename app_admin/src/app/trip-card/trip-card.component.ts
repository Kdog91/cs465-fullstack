import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  @Input('trip') trip!: Trip;
  @Output() deleted = new EventEmitter<void>();

  constructor(
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: Trip): void {
    if (!confirm('Delete the trip "' + trip.name + '"?')) {
      return;
    }
    this.tripDataService.deleteTrip(trip.code).subscribe({
      next: () => this.deleted.emit(),
      error: (err: any) => console.error(err)
    });
  }
}
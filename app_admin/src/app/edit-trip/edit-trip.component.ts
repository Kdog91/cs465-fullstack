import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  submitted = false;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        const trip = value[0];
        if (!trip) {
          this.message = 'Trip not found';
          return;
        }
        const start = trip.start ? String(trip.start).substring(0, 10) : '';
        this.editForm.patchValue({ ...trip, start: start });
      },
      error: (err: any) => {
        console.error(err);
        this.message = 'Could not load the trip.';
      }
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.getRawValue()).subscribe({
        next: () => this.router.navigate(['']),
        error: (err: any) => {
          console.error(err);
          this.message = 'Could not update the trip.';
        }
      });
    }
  }

  public cancel(): void {
    this.router.navigate(['']);
  }

  get f() {
    return this.editForm.controls;
  }
}
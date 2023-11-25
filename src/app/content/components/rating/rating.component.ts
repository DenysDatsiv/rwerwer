import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input()value;
  getStars = (rating: number): number[] => [...Array(Math.floor(rating)).keys()];
}

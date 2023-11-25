import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-customer-review',
  templateUrl: './product-customer-review.component.html',
  styleUrls: ['./product-customer-review.component.scss']
})
export class ProductCustomerReviewComponent {
  @Input() review;
  showFullComment = false;

  shouldDisplayButton(): boolean {
    return this.review.comment.length > 300;
  }

  toggleCommentView(): void {
    this.showFullComment = !this.showFullComment;
  }
}

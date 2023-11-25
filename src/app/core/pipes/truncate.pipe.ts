// Import necessary modules and decorators
import { Pipe, PipeTransform } from '@angular/core';

// Define the pipe using the @Pipe decorator
@Pipe({
    name: 'truncate'
})

// Implement the PipeTransform interface
export class TruncatePipe implements PipeTransform {

    // Implement the transform method as specified by PipeTransform
    transform(value: string, limit: number): string {
        if (value.length <= limit) {
            return value;
        }

        return value.slice(0, limit) + '...';
    }
}
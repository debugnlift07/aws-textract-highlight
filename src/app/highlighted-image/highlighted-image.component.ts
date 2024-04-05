import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-highlighted-image',
  templateUrl: './highlighted-image.component.html',
  styleUrls: ['./highlighted-image.component.css']
})
export class HighlightedImageComponent {
  @Input() src: string|null;
  @Input() coordinates: any[]|null;
  @Input() clickedLineIndex: number|null;

  constructor() {
    this.src=null;
    this.coordinates=null;
   this.clickedLineIndex=null; 
  }

  getLeftValue(coord: any): string {
    return (coord.Left * 100) + '%';
  }

  getTopValue(coord: any): string {
    return (coord.Top * 100) + '%';
  }

  getWidthValue(coord: any): string {
    return (coord.Width * 100) + '%';
  }

  getHeightValue(coord: any): string {
    return (coord.Height * 100) + '%';
  }
}

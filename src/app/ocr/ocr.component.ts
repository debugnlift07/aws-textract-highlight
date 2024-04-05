import { Component } from '@angular/core';
import { TextractClient, DetectDocumentTextCommand } from '@aws-sdk/client-textract';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css']
})
export class OcrComponent {
  src: string = '';
  data: any[] = [];
  searchQuery: string = '';
  highlightedCoordinates: any;
  clickedLineIndex: number | null = null;
  extractedLines: string[] = [];
  clickedRegionIndex: number | null = null;

  onSearchChange(index: number): void {
   // Perform search logic here
    // You can create a new array with matched results
    const matchedResults = this.data.filter(item => item?.Text?.includes(this.searchQuery));

    // Update the data to show matched results
    this.data = matchedResults;

    // Apply search highlighting to extracted lines
    const highlightedLines = this.extractedLines.map(line => this.highlightSearchResultsByLine(line, this.searchQuery));
    this.extractedLines = highlightedLines;
     this.clickedLineIndex=index;
  
   }
  constructor() {
    this.clickedLineIndex=null;
  }


  onSelectFile(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) {
      return;
    }
    const file = target.files[0];

    const reader = new FileReader();
    reader.onload = (upload: any) => {
      this.src = upload?.target?.result;
    };
    reader.readAsDataURL(file);
  }

  async onRunOCR(): Promise<void> {
    const client = new TextractClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: '**',
				secretAccessKey: '**',
      },
    });
    const blob = Buffer.from(this.src.split(',')[1], 'base64');

    const params = {
      Document: {
        Bytes: blob,
      },
      FeatureTypes: ['TABLES', 'FORMS'],
    };
   
    const command = new DetectDocumentTextCommand(params);
    try {
      const response = await client.send(command);

      if (response?.Blocks) {
        this.data = response.Blocks;

        const lines:any[] = [];
        const textCoordinates = response.Blocks.filter(item => item?.BlockType === 'LINE' && item?.Geometry)?.map(item => {
          lines.push(item.Text);
          return item.Geometry?.BoundingBox;
        });
        

        this.highlightedCoordinates = textCoordinates;
        this.extractedLines = lines;
      }
    } catch (error) {
      console.log('err', error);
      // Error handling
    }
  }


  highlightSearchResults(text: string, searchQuery: string): string {
    if (!searchQuery) {
      return text;
    }

    const escapedQuery = searchQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    return text?.split(regex)?.map((part, index) =>
      regex?.test(part) ? (
        `<span style="background-color: yellow">${part}</span>`
      ) : (
        part
      )
    ).join('');
  }

  highlightSearchResultsByLine(line: string, searchQuery: string): string {
    if (!searchQuery) {
      return line;
    }

    const escapedQuery = searchQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    return line
      .split('\n')
      .map((text, index) => this.highlightSearchResults(text, searchQuery))
      .join('');
  }
}

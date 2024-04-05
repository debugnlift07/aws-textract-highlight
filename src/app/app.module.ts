import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCropperModule } from 'ngx-image-cropper'; // Import the ImageCropperModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule for form support

import { AppComponent } from './app.component';
import { OcrComponent } from './ocr/ocr.component';
import { HighlightedImageComponent } from './highlighted-image/highlighted-image.component';

@NgModule({
  declarations: [AppComponent, OcrComponent, HighlightedImageComponent],
  imports: [BrowserModule, ReactiveFormsModule, ImageCropperModule], // Add ImageCropperModule and ReactiveFormsModule to imports
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

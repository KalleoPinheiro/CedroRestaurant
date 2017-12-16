import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HomePageComponent, ErrorPageComponent],
  exports: [HomePageComponent, ErrorPageComponent]
})
export class PagesModule {}

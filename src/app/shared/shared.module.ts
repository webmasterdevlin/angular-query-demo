import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, BrowserModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}

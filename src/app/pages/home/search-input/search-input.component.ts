import { Component } from '@angular/core';
import {ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  isActive = false;
  searchText = '';
  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;
  @Output() searchClick = new EventEmitter<string>();

  activate(): void {
    this.isActive = true;
    setTimeout(() => this.searchInputRef?.nativeElement.focus());
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchClick.emit(this.searchText);
    this.searchInputRef?.nativeElement.focus();
  }

  onInputClick(event: MouseEvent) {
    event.stopPropagation();
    this.activate();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest(
      '.search-bar-container',
    );
    if (!clickedInside) {
      this.isActive = false;
    }
  }

  onSearch(): void {
    this.searchClick.emit(this.searchText);
  }
}

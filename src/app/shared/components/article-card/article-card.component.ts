import { Component, Input, ChangeDetectionStrategy, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Article } from '../../../services/card.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,DatePipe],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardOverviewExample {
  @Input() article!: Article;
  @Input() searchText: string = '';
  constructor(private router: Router) {} 

  highlight(text: string): string {
    if (!this.searchText) return text;
    const keywords = this.searchText.split(/\s+/).filter(k => k);
    let highlighted = text;

    for (const keyword of keywords) {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlighted = highlighted.replace(regex, `<mark style="background: yellow;">$1</mark>`);
    }

    return highlighted;
  }

    onReadMore(): void {
    if (!this.article.id) {
      console.error('article.id не визначено', this.article);
      return;
    }
    this.router.navigate(['/article', this.article.id]);
  }
  
}

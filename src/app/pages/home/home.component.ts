import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService, Article } from '../../services/card.service';
import { SearchInputComponent } from "./search-input/search-input.component";
import { CardOverviewExample } from '../../shared/components/article-card/article-card.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,  SearchInputComponent,CardOverviewExample ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() article!: Article;
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  searchText = '';
  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.cardService.getArticles().subscribe(response => {
      this.articles = response.results;
      this.filteredArticles = [...this.articles];
    });
  }

  onSearch(keyword: string): void {
    this.searchText = keyword.trim().toLowerCase();
    const keywords = this.searchText.split(/\s+/).filter(k => k);

    if (!keywords.length) {
      this.filteredArticles = [...this.articles];
      return;
    }

    this.filteredArticles = this.articles
      .map(article => {
        const title = article.title.toLowerCase();
        const summary = article.summary.toLowerCase();

        const titleMatches = keywords.some(k => title.includes(k));
        const descMatches = keywords.some(k => summary.includes(k));

        let score = 0;
        if (titleMatches) score += 2;
        if (descMatches) score += 1;

        return { ...article, score };
      })
      .filter(a => a.score > 0)
      .sort((a, b) => b.score - a.score);
  }
}

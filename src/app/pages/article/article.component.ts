import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardService, Article } from '../../services/card.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, MatCardModule], 
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article?: Article;
  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
    onReadMore(): void {
    this.router.navigate(['/home']);
    }
  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.cardService.getArticlesByID(id).subscribe((response: any) => {
      if (response && typeof response === 'object' && 'results' in response) {
        this.article = (response as { results: Article[] }).results?.[0];
      } else {
        this.article = response as Article;
      }
    });
  }
}

}

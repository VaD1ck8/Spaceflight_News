import { Component } from '@angular/core';
import { HomeComponent } from "./pages/home/home.component";
import { Article, CardService } from './services/card.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] ,
   template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'Spaceflight_News';

  constructor(private cardService: CardService) { }
   articles: Article[] = [];

  ngOnInit() {
    this.cardService.getArticles().subscribe(response => {
      this.articles = response.results;
    });
  }
}
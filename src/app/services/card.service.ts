import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  results?: number;
}

@Injectable({ providedIn: 'root' })
export class CardService {
  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles';
  private apiId_Url = 'https://api.spaceflightnewsapi.net/v4/articles/{id}';

  constructor(private http: HttpClient) {}
  
  getArticles(): Observable<{ results: Article[] }> {
    return this.http.get<{ results: Article[] }>(this.apiUrl);
  }
  getArticlesByID(id:string): Observable<{ results:Article[] }> {
    return this.http.get<{ results: Article[] }>(this.apiId_Url.replace('{id}',id));
    
  }
}

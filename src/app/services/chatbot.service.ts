import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chatbot } from '../models/chatbot';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private apiUrl = 'https://68618fba8e74864084466873.mockapi.io/api/v1/questions';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Chatbot[]> {
    return this.http.get<Chatbot[]>(this.apiUrl);
  }
}

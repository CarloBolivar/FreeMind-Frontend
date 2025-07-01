import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chatbot } from '../../../models/chatbot';
import { ChatbotService } from '../../../services/chatbot.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apichatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apichatbot.component.html',
  styleUrls: ['./apichatbot.component.css']
})
export class ApichatbotComponent implements OnInit {
  questions: Chatbot[] = [];
  index = 0;
  chat: { from: 'bot' | 'user', text: string }[] = [];
  input = '';
  noCount = 0;
  done = false;
  result = '';

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.chatbotService.getQuestions().subscribe(data => {
      this.questions = data;
      if (this.questions.length > 0) {
        this.say(this.questions[this.index].texto);
      }
    });
  }

  say(msg: string): void {
    this.chat.push({ from: 'bot', text: msg });
  }

  reply(): void {
    const val = this.input.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const yes = ['si', 'sí'];
    const no = ['no'];

    if (!yes.includes(val) && !no.includes(val)) {
      this.say('Por favor, responde solo con "Sí" o "No".');
      this.input = '';
      return;
    }

    this.chat.push({ from: 'user', text: this.input });

    if (no.includes(val)) {
      this.noCount++;
    }

    this.input = '';
    this.index++;

    if (this.index < this.questions.length) {
      setTimeout(() => this.say(this.questions[this.index].texto), 500);
    } else {
      setTimeout(() => this.finish(), 500);
    }
  }

  finish(): void {
    if (this.noCount <= 1) this.result = 'Saludable';
    else if (this.noCount <= 3) this.result = 'Moderado';
    else this.result = 'Crítico';

    this.done = true;
    this.say(`Tu estado de salud mental es: ${this.result}`);
  }
}

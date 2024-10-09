import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Message {
  id: number;
  author: string;
  subject: string;
  content: string;
  time: string;
  status: string; 
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Message[] = [
    { id: 1, author: 'Anónimo', subject: 'Denuncia Abuso Sexual', content: 'Necesito una solución...', time: '13:00', status: 'en revision' },
    { id: 2, author: 'Anónimo', subject: 'Motivos de denuncia', content: 'Quiero más información...', time: '13:00', status: 'denuncia resuelta' },
  ];

  selectedTab: string = 'todos';
  selectedMessage: Message | null = null;
  replyContent: string = '';

  statuses: string[] = [
    'en revision',
    'en investigacion',
    'accion en curso',
    'denuncia resuelta',
    'stand by',
    'desestimado'
  ];

  get filteredMessages(): Message[] {
    if (this.selectedTab === 'todos') {
      return this.messages;
    } else {
      return this.messages.filter(message => message.status === this.selectedTab);
    }
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.selectedMessage = null; 
  }

  selectMessage(message: Message): void {
    this.selectedMessage = message;
  }

  updateMessageStatus(): void {
    if (this.selectedMessage) {
      console.log(`Estado del mensaje actualizado a: ${this.selectedMessage.status}`);
    }
  }

  replyToMessage(): void {
    if (this.selectedMessage) {
      console.log(`Respondido a ${this.selectedMessage.author}: ${this.replyContent}`);
      this.replyContent = ''; 
    }
  }
}

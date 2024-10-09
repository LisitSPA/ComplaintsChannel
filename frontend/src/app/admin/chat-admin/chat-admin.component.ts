import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';

@Component({
  selector: 'app-chat-admin',
  standalone: true,
  imports: [CommonModule, FormsModule,SidebarAdmin],
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent {
  chatList = [
    { id: 1, name: 'Anónimo', subject: 'Denuncia Abuso Sexual', time: '13:00', message: 'Necesito una solución para esto lo antes posible.', status: 'pendiente' },
    { id: 2, name: 'Anónimo', subject: 'Motivos de denuncia', time: '13:00', message: 'Necesito una solución urgente.', status: 'finalizado' },
  ];

  filteredChatList = [...this.chatList]; 
  selectedChat: any = null;
  status = 'en_revision';
  responseMessage = '';

  filterChats(filter: string) {
    if (filter === 'todos') {
      this.filteredChatList = [...this.chatList];
    } else {
      this.filteredChatList = this.chatList.filter(chat => chat.status === filter);
    }
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  sendResponse() {
    console.log('Estado de solicitud:', this.status);
    console.log('Respuesta:', this.responseMessage);
  }
}

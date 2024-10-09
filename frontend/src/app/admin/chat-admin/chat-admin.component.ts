import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
import { ChatService } from '../../services/chat.service';

interface Chat {
  id: number;
  name: string;
  subject: string;
  time: string;
  message: string;
  status: string;  
}

@Component({
  selector: 'app-chat-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarAdmin],
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent implements OnInit {
  chatList: Chat[] = [
    { id: 1, name: 'Juan Pérez', subject: 'Denuncia de acoso', time: '10:30', message: 'Necesito ayuda con un caso de acoso en el trabajo.', status: 'pendiente' },
    { id: 2, name: 'Anónimo', subject: 'Problema de nómina', time: '11:00', message: 'No he recibido mi pago.', status: 'finalizado' },
    { id: 3, name: 'Ana García', subject: 'Solicitud de revisión', time: '12:15', message: 'Por favor revisen mi caso, sigue sin resolverse.', status: 'en_revision' },
    { id: 4, name: 'Carlos López', subject: 'Problema de horario', time: '13:45', message: 'Mis horarios no han sido actualizados en el sistema.', status: 'pendiente' }
  ];  
  
  filteredChatList: Chat[] = [...this.chatList];  
  selectedChat: Chat | null = null;
  activeTab = 'todos'; 
  responseMessage = '';
  status = 'revision';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadAllChats('es');
  }

  loadAllChats(language: string) {
    this.chatService.getAllChats(language).subscribe(
      (data: Chat[]) => {  
        this.chatList = data;
        this.filteredChatList = [...this.chatList];
      },
      (error) => {
        console.error('Error al cargar los chats:', error);
      }
    );
  }

  filterChats(filter: string) {
    this.activeTab = filter; 
    if (filter === 'todos') {
      this.filteredChatList = [...this.chatList];
    } else {
      this.filteredChatList = this.chatList.filter(chat => chat.status === filter);
    }
  }

  selectChat(chat: Chat) {
    this.selectedChat = chat;
  }

  sendResponse() {
    if (this.selectedChat) {
      this.chatService.sendChatResponse(this.selectedChat.id.toString(), this.responseMessage).subscribe(
        (response) => {
          console.log('Respuesta enviada con éxito:', response);
        },
        (error) => {
          console.error('Error al enviar la respuesta:', error);
        }
      );
    }
  }
}

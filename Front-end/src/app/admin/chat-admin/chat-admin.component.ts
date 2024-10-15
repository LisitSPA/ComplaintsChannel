import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
import { ChatService } from '../../services/chat.service';
import { ComplaintService } from '../../services/complaint.service';

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
  chatList: Chat[] = [];  
  
  filteredChatList: Chat[] = [...this.chatList];  
  selectedChat: Chat | null = null;
  activeTab = 'todos'; 
  responseMessage = '';
  status = 'revision';

  constructor(private chatService: ChatService,
    private complaintService: ComplaintService,
  ) {}

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

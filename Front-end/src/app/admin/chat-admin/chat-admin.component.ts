import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
import { ChatService } from '../../services/chat.service';
import { ComplaintService } from '../../services/complaint.service';
import { HttpParams } from '@angular/common/http';
import { ChatComponent } from '../../common/chat/chat.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-chat-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarAdmin, ChatComponent, MatIconModule ],
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent implements OnInit {


  chatList: any[] = [];  
  chat: any[] = [];  

  filteredComplaints: any[] = []; 
  selectedComplaint: any;
  activeTab = 'todos'; 
  responseMessage = '';
  status = 'revision';
  complaints: any[] = [];

  constructor(private chatService: ChatService,
    private complaintService: ComplaintService,
  ) {}

  ngOnInit(): void {
    this.loadAllChats('es');
    this.loadAllComplaints();
  }

  async loadAllComplaints(){
    let params = new HttpParams()
    this.complaints = (await this.complaintService.getAllComplaintsPromise(params)).data;
    this.filterChats('todos');
  }

  getLastMessage(complaintId: number): string{
    var chat = this.chatList.filter(x => x.complaintId == complaintId).sort((a, b) => a - b);
    if(chat.length)
      return chat[0].message
    
    return ""
  }

  loadAllChats(language: string) {
    this.chatService.getAllChats(language).subscribe(
      (data: any) => {  
        this.chatList = data.content;
      },
      (error) => {
        console.error('Error al cargar los chats:', error);
      }
    );
  }

  filterChats(filter: string) {
    this.activeTab = filter; 
    if (filter === 'todos') {
      this.filteredComplaints = [...this.complaints];
    } else if(filter === 'pendientes') {
      this.filteredComplaints = this.complaints.filter(x => x.eStatus < 3);
    } else {
      this.filteredComplaints = this.complaints.filter(x => x.eStatus > 3);
    }
  }


  async selectChat(complaint: any) {
    
    this.selectedComplaint = complaint
  }


  
  updateComplaint() {
   
    // this.chatService.sendChatResponse(this.selectedComplaint.code, this.responseMessage).subscribe(
    //   (response) => {
    //     console.log('Respuesta enviada con éxito:', response);
    //   },
    //   (error) => {
    //     console.error('Error al enviar la respuesta:', error);
    //   }
    // );
    
  }


}








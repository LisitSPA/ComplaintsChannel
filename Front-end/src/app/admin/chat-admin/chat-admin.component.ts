import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
import { ChatService } from '../../services/chat.service';
import { ComplaintService } from '../../services/complaint.service';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-chat-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarAdmin],
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css']
})
export class ChatAdminComponent implements OnInit {


  chatList: any[] = [];  
  chat: any[] = [];  

  filteredComplaints: any[] = []; 
  selectedComplaint: any = [];
  activeTab = 'todos'; 
  responseMessage = '';
  status = 'revision';
  complaints: any;

  constructor(private chatService: ChatService,
    private complaintService: ComplaintService,
  ) {}

  ngOnInit(): void {
    this.loadAllChats('es');
    this.loadAllComplaints();
  }

  async loadAllComplaints(){
    let params = new HttpParams()
    this.complaints = await this.complaintService.getAllComplaintsPromise(params);
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
    // this.activeTab = filter; 
    // if (filter === 'todos') {
    //   this.filteredChatList = [...this.chatList];
    // } else {
    //   this.filteredChatList = this.chatList.filter(chat => chat.status === filter);
    }


  async selectChat(complaint: any) {
    
    
  }


  
  sendResponse() {
   
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








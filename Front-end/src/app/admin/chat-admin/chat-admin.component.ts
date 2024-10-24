import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdmin } from '../admin/sidebar-component/sidebar-admin.component';
import { ChatService } from '../../services/chat.service';
import { ComplaintService } from '../../services/complaint.service';
import { HttpParams } from '@angular/common/http';
import { ChatComponent } from '../../common/chat/chat.component';
import { MatIconModule } from '@angular/material/icon';
import { delay } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


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
  status : number | undefined;
  complaints: any[] = [];
  message: any;
  mensajeError: any;
  mensajeExito: any;
  showChat: any = false;
  complaintId: number = 0;

  constructor(private chatService: ChatService,
    private complaintService: ComplaintService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {

    this.route.paramMap.subscribe(params => {
      this.complaintId = parseInt(params.get('id')??"0");     
    });

    this.loadAllChats('es');
    await this.loadAllComplaints();
  
    if(this.complaintId)
      this.filteredComplaints = this.complaints.filter(x=> x.id == this.complaintId)

  }

  async loadAllComplaints(){
    let params = new HttpParams()
    this.complaints = (await this.complaintService.getAllComplaintsPromise(params)).data;
    this.filterComplaints(this.activeTab);
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

  filterComplaints(filter: string) {
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
    
    this.selectedComplaint = undefined
    this.chat = await this.chatService.getChatByComplaintCode(complaint.trackingCode);
    this.selectedComplaint = complaint
   
  }
  
  updateComplaint() {
      let data = {
      complaintId : this.selectedComplaint.id,
      eComplaintStatus : this.status,
      notes: this.responseMessage,        
    };
   
    this.complaintService.updateStatus(data).subscribe(
      (response) => {
       this.responseMessage = ""
       this.status = 0
       this.mensajeExito = 'Denuncia actualizada correctamente';    
       this.loadAllComplaints();    
      },
      (error) => {
        console.log(error)
        this.mensajeError = 'Error al actualizar la denuncia';      
      }
    );
    
  }


}








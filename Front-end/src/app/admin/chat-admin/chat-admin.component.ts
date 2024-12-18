import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ComplaintService } from '../../services/complaint.service';
import { HttpParams } from '@angular/common/http';
import { ChatComponent } from '../../common/chat/chat.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { requestStates } from '../../../constants/requestState';
import { NotifierModule, NotifierService } from 'gramli-angular-notifier';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-chat-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NotifierModule,
    ChatComponent,
    MatIconModule,
    MatTooltip,
  ],
  templateUrl: './chat-admin.component.html',
  styleUrls: ['./chat-admin.component.css'],
})
export class ChatAdminComponent implements OnInit {
  chatList: any[] = [];
  chat: any[] = [];
  filteredComplaints: any[] = [];
  selectedComplaint: any;
  activeTab = 'todos';
  responseMessage = '';
  status: number | undefined;
  complaints: any[] = [];
  message: any;
  showChat: any = false;
  isLoading: any = false;
  complaintId: number = 0;
  states = requestStates;
  textFilter = '';

  constructor(
    private chatService: ChatService,
    private complaintService: ComplaintService,
    private notifier: NotifierService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      this.complaintId = parseInt(params.get('id') ?? '0');
    });

    // this.loadAllChats('es');
    await this.loadAllComplaints();

    if (this.complaintId)
      this.filteredComplaints = this.complaints.filter(
        (x) => x.id == this.complaintId
      );
  }

  async loadAllComplaints() {
    let params = new HttpParams();
    this.complaints = (
      await this.complaintService.getAllComplaintsPromise(params)
    ).data;
    this.filterComplaints(this.activeTab);
  }

  getLastMessage(complaintId: number): string {
    var chat = this.chatList
      .filter((x) => x.complaintId == complaintId)
      .sort((a, b) => a - b);
    if (chat.length) return chat[0].message;

    return '';
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

  filterComplaints(category?: string) {
    
    if (category) this.activeTab = category;

    if (this.activeTab === 'todos') {
      this.filteredComplaints = [...this.complaints];
    } else if (this.activeTab === 'pendientes') {
      this.filteredComplaints = this.complaints.filter((x) => x.eStatus < 3);
    } else {
      this.filteredComplaints = this.complaints.filter((x) => x.eStatus > 3);
    }

    if (this.textFilter) {
      const textToSearch = this.textFilter.toLowerCase();
      this.filteredComplaints = this.filteredComplaints.filter(
        (x) => 
          x.complaintNumber.toLowerCase().includes(textToSearch)
          || x.status.toLowerCase().includes(textToSearch)
          || x.complainant?.names?.toLowerCase()?.includes(textToSearch)
          || (x.complainant == null && ('anónimo'.includes(textToSearch) || 'anonimo'.includes(textToSearch)))
          || x.reasons[0].description.toLowerCase().includes(textToSearch)
      );
    }
  }

  async selectChat(complaint: any) {
    this.selectedComplaint = undefined;
    setTimeout(() => {
      this.selectedComplaint = complaint;
    }, 500);
  }

  updateComplaint() {
    if (!this.status || !requestStates.some((x) => x.value == this.status)) {
      this.notifier.notify('error', 'Por favor selecciona un estado');
      return;
    }
    if (!this.responseMessage) {
      this.notifier.notify('error', 'Por favor ingresa una respuesta');
      return;
    }

    this.isLoading = true;

    let data = {
      complaintId: this.selectedComplaint.id,
      eComplaintStatus: this.status,
      notes: this.responseMessage,
    };

    this.complaintService.updateStatus(data).subscribe(
      async (response) => {
        this.responseMessage = '';
        this.status = 0;
        this.notifier.notify('success', 'Denuncia actualizada correctamente');
        await this.loadAllComplaints();
        this.selectChat(this.complaints.filter(x=> x.id == this.selectedComplaint.id)[0])
      },
      (error) => {
        console.error('Error al actualizar la denuncia', error);
        this.notifier.notify('error', 'Error al actualizar la denuncia');
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}

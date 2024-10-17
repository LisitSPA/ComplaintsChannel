import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { MatIcon } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, MatIcon, MatDialogModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{

  
  @Input() complaint : any = []
  message: string = '';
  chat: any;
  filesUrl: any;
  file: any;

  constructor(
    private chatService : ChatService
  ){

  }
  
  ngOnInit(): void {
    this.getChat()
  }

  
  sendMessage(): void {
    if(!this.message && !this.file)
      return;

    this.chatService.sendChatResponse(this.complaint.trackingCode, this.message, this.file != null ? this.file[0] : null).subscribe(
      (x) => {
        this.message = ""
        this.getChat()
      }
    )
  }

  async getChat() {
   
    this.chat = await this.chatService.getChatByComplaintCode(this.complaint.trackingCode);
    console.log(this.chat)
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.file = input.files;
      console.log(this.file[0])
      this.message =  this.file[0].name
    }
   
  }
  
  
}

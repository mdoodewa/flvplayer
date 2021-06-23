import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
  providers:[ChatService]
})
export class ChatRoomComponent implements OnInit {
  user:String;
    room:String;
    messageText:String;
    messageArray:Array<{user:String,message:String}> = [];

  constructor(private _chatService:ChatService) {
    this._chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));


        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this._chatService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data))
   }

  sendMessage()
    {
        this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
    }

  ngOnInit(): void {
  }

}

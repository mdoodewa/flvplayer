import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
  providers:[ChatService]
})
export class ChatRoomComponent implements OnInit {
  user: "test";
    room:String;
    messageText:String;
    messageArray:Array<{user:String,message:String}> = [];

  constructor(private _chatService:ChatService, private route: ActivatedRoute) {
    this._chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));


        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this._chatService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data))
   }

  sendMessage()
    {
        this._chatService.sendMessage({user:"test",  message:this.messageText, room:this.room,});
    }

  ngOnInit(): void {
    this.room = this.route.snapshot.params.id;
  }

}

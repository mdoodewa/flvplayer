import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as flvjs from '../../../node_modules/flv.js/dist/flv';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css'],
  providers:[ChatService]
})
export class StreamComponent implements OnInit {

    title:String;
    user:String;
    room:String;
    messageText:String;
    messageArray:Array<{user:String,message:String}> = [];
    constructor(private _chatService:ChatService, private route: ActivatedRoute){
        this._chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));


        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        // this._chatService.newMessageReceived()
        // .subscribe(data=>this.messageArray.push(data));
    }

    join(){
        this._chatService.joinRoom({user:this.user, room: this.title});
    }

    leave(){
        this._chatService.leaveRoom({user:this.user, room:this.room});
    }

  ngOnInit() {
    // var videoElement = document.getElementById('videoElement');
    // var flvPlayer = flvjs.createPlayer({
    //   type: 'flv',
    //   isLive: true,
    //   url: 'http://145.49.4.49:8000/live/STREAM_NAME.flv'

    // });
    // flvPlayer.attachMediaElement(videoElement);
    // flvPlayer.load();
    // flvPlayer.play();

    this.title = this.route.snapshot.params.id;
  }
}

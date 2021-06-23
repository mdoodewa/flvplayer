import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';




@Injectable()


export class ChatService{

    private socket = io('http://localhost:3000');

    joinRoom(data)
    {
      console.log(data.user, data.room);
      this.socket.emit('join', data.user, data.room);
    }

    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leaveRoom(data){
        this.socket.emit('leave',data);
    }

    userLeftRoom(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data)
    {
        console.log("sendMessage called", data.user, data.message, data.room);
        this.socket.emit('message',data);
    }

// this.socket.on('new message', (data)=>{

//     })

newMessageReceived(){
      console.log("newMessageReceived called")
      let observable = new Observable<{user:String, message:String}>(observer=>{
          console.log("obsevable called")
          this.socket.on('new message', (data)=>{
              console.log("new message called")
              observer.next(data);
            });
          return () => {this.socket.disconnect();}
        });

      return observable;
    }
}

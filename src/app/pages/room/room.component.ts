import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  userId!: string;
  roomId!: string;
  room: any;

  questionText = '';

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id');
    if (!this.roomId) return;

    this.userId = sessionStorage.getItem('userId');
    if (!this.userId) {
      this.roomService.createParticipant(this.roomId).then(res => {
        this.userId = res.key;
        sessionStorage.setItem('userId', this.userId);
        this.subscribeRoom();
      });
    } else {
      this.subscribeRoom();
    }
  }

  subscribeRoom(): void {
    this.roomService.getRoomById(this.roomId).subscribe(room => {
      if (!room.currentParticipant) {
        room.currentParticipant = room.participants[0].key;
        this.roomService.updateRoom(this.roomId, {currentParticipant: this.userId});
        return;
      }
      this.room = room;
    });
  }

  submitQuestion(): void {
    const index = this.room.participants.findIndex(el => el.key === this.room.currentParticipant);
    this.roomService.updateRoom(this.roomId, {
      currentParticipant: index < this.room.participants.length - 1 ? this.room.participants[index + 1].key : this.room.participants[0].key,
      currentQuestion: this.questionText
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RoomService} from '../../services/room.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  rooms$!: Observable<any []>;

  constructor(
    private router: Router,
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    sessionStorage.removeItem('userId');
    this.rooms$ = this.roomService.getRoomList();
  }

  createRoom(): void{
    this.roomService.createRoom().then(res => {
      this.router.navigate(['room', res.key]);
    });
  }

}

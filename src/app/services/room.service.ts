import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {


  constructor(private db: AngularFireDatabase) {}

  getRoomList(): Observable<any[]> {
    return this.db.list<any>('rooms').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          return {
            key: c.payload.key,
            availableParticipats: 3 - Object.keys(c.payload.val().participants ? c.payload.val().participants  : {}).length
          };
        });
      })
    );
  }

  getRoomById(roomId: string): any {
    return this.db.object<{participants: {role} }>(`rooms/${roomId}`).snapshotChanges().pipe(
      map(changes => {
          const room = changes.payload.val();
          const participants = [];
          for (const [key, value] of Object.entries(room.participants)) {
            // @ts-ignore
            participants.push({
                key,
                role: value.role,
              });
            }
          return {
            ...room,
            participants
          };
        })
    );
  }

  createRoom(): any {
    return this.db.list<any>(`rooms`).push({currentParticipant: '', participants: []});
  }

  updateRoom(roomId, fields): any {
    return this.db.list<any>(`rooms`).update(roomId, {...fields});
  }

  removeRoom(key): any{
    return this.db.list<any>(`rooms`).remove(key);
  }

  createParticipant(roomId): any {
    return this.db.list<any>(`rooms/${roomId}/participants`).push({role: 'participant'});
  }

  removeParticipant(roomId, key): any{
    return this.db.list<any>(`rooms/${roomId}/participants`).remove(key);
  }
}

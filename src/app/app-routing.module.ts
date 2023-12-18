import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoomComponent} from './pages/room/room.component';
import {RoomListComponent} from './pages/room-list/room-list.component';

const routes: Routes = [
  { path: 'room/:id', component: RoomComponent },
  { path: 'rooms', component: RoomListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

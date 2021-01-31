import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {ListSongComponent} from './list-song/list-song.component';
import {DetailSongComponent} from './detail-song/detail-song.component';
import {UpdateSongComponent} from './update-song/update-song.component';
import {CreateSongComponent} from './create-song/create-song.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'list',
        component: ListSongComponent
      },
      {
        path: 'create',
        component: CreateSongComponent
      },
      {
        path: ':id',
        component: DetailSongComponent
      },
      {
        path: ':id/update',
        component: UpdateSongComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

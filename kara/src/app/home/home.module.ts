import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ListSongComponent } from './list-song/list-song.component';
import { DetailSongComponent } from './detail-song/detail-song.component';
import { UpdateSongComponent } from './update-song/update-song.component';
import { CreateSongComponent } from './create-song/create-song.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, ListSongComponent, DetailSongComponent, UpdateSongComponent, CreateSongComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }

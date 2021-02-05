import {Component, OnInit} from '@angular/core';
import {SongService} from '../_services/song.service';
import {ISong} from '../_shared/interface/song';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentSong: ISong;
  emotions = ['All', 'happy', 'sad'];
  currentEmotion: string;

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.getRandomSong();
  }

  getRandomSong(): void {
    this.songService.getRandomSong().subscribe(
      next => {
        this.currentSong = next;
      }
    );
  }

  updateListSong(): void {
    this.getRandomSong();
  }

}

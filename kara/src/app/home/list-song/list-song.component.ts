import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ISong} from '../../_shared/interface/song';
import {SongService} from '../../_services/song.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {
  listSong$: Observable<ISong[]>;

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.listSong$ = this.songService.getSongs();
  }


  deleteThisSong(id: string): void {
    console.log(id);
    this.songService.deleteSong(id).subscribe(
      next => {
        this.listSong$ = this.songService.getSongs();
      }
    );
  }
}

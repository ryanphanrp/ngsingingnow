import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ISong} from '../../_shared/interface/song';
import {SongService} from '../../_services/song.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {HotToastService} from '@ngneat/hot-toast';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {
  listSong$: Observable<ISong[]>;

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    @Inject(DOCUMENT) document) {
  }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(
        next => {
          if (next.emotion) {
            console.log(next.emotion);
            this.getListSongByEmotion(next.emotion);
          } else {
            this.getListSong();
          }
        }
      );
  }

  getListSong(): void {
    this.listSong$ = this.songService.getSongs();
  }

  getListSongByEmotion(emotion: string): void {
    this.listSong$ = this.songService.getSongs().pipe(map(songs =>
      songs.filter(song => song.emotion === emotion)
    ));
  }


  deleteThisSong(id: string): void {
    console.log(id);
    this.songService.deleteSong(id).subscribe(
      next => {
        this.listSong$ = this.songService.getSongs();
      }
    );
  }

  /**
   *  Modal
   */
  showModal(id: string): void {
    document.getElementById(id).style.display = 'block';
    console.log(document.getElementById(id).innerText);
  }

  hideModal(id: string): void {
    document.getElementById(id).style.display = 'none';
  }
}

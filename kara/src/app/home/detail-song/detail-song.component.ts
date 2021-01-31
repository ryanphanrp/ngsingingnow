import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {SongService} from '../../_services/song.service';
import {ISong} from '../../_shared/interface/song';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {

  currentSong: ISong;
  isShowLyric = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private songService: SongService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(ID => this.songService.getSingleSong(ID))
    ).subscribe(
      next => {
        this.currentSong = next;
      },
      err => {
        console.log(err.error.message);
      }
    );
  }

  showLyric(): void {
    this.isShowLyric = !this.isShowLyric;
  }

}

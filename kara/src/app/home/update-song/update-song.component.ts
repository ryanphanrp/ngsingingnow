import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../_services/song.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {ISong} from '../../_shared/interface/song';
import {HotToastService} from '@ngneat/hot-toast';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.scss']
})
export class UpdateSongComponent implements OnInit {

  songForm: FormGroup;
  currentSong: ISong;

  constructor(
    private fb: FormBuilder,
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toast: HotToastService
  ) {
    this.songForm = this.fb.group({
      title: ['', [Validators.required]],
      artist: ['', [Validators.required]],
      emotion: ['', [Validators.required]],
      lyric: ['']
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(ID => this.songService.getSingleSong(ID))
    ).subscribe(
      next => {
        this.currentSong = next;
        this.songForm.patchValue({
          title: this.currentSong.title,
          artist: this.currentSong.artist,
          emotion: this.currentSong.emotion,
          lyric: this.currentSong.lyric
        });
      },
      err => {
        console.log(err.error.message);
      }
    );
  }

  submit(): void {
    this.songService.updateSong(this.currentSong._id, this.songForm.value).subscribe(
      next => {
        this.toast.success(next.message);
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      },
      error => {
        this.toast.error(error.error.message);
      }
    );
  }

  copyFromClipBoard(): void {
    /// For IE
    if (window[`clipboardData`]) {
      const value = window[`clipboardData`].getData('Text');
      this.songForm.patchValue({lyric: value});
    }
    else {
      // for other navigators
      navigator[`clipboard`].readText().then(clipText => {
        this.songForm.patchValue({lyric: clipText});
      });
    }
  }
}

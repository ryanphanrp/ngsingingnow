import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../_services/song.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HotToastService} from '@ngneat/hot-toast';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {

  songForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private songService: SongService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: HotToastService
  ) {
  }

  ngOnInit(): void {
    this.songForm = this.fb.group({
      title: ['', [Validators.required]],
      artist: ['', [Validators.required]],
      emotion: ['', [Validators.required]],
      lyric: ['']
    });
  }

  submit(): void {
    this.songService.createSong(this.songForm.value).subscribe(
      next => {
        this.toast.success(next.message);
        this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
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

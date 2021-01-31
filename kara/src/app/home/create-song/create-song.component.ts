import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../_services/song.service';
import {ActivatedRoute, Router} from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.songForm = this.fb.group({
      title: ['', [Validators.required]],
      artist: ['', [Validators.required]],
      lyric: ['']
    });
  }

  submit(): void {
    this.songService.createSong(this.songForm.value).subscribe(
      next => {
        console.log('Success!');
        this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-thumbing',
  templateUrl: './thumbing.component.html',
  styleUrls: ['./thumbing.component.scss']
})
export class ThumbingComponent implements OnInit {
  @Input() activeThumbIndex = 0;
  @Input() thumbs = [0, 1, 2, 3, 4, 5];
  @Output() thumb = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onThumb(idx) {
    this.thumb.emit(idx);
  }
}

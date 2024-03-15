import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-change-bg',
  templateUrl: './change-bg.component.html',
  styleUrls: ['./change-bg.component.scss']
})
export class ChangeBgComponent {
  imageSrc: any = '';
  imageColor: any = '';
  @ViewChild('loaderBtn') loaderBtn!: ElementRef;
  @ViewChild('changeBg') changeBg!: ElementRef;
  @ViewChild('mainBG') mainBG!: ElementRef;

  ngOnInit(): void {
    this.imageColor = localStorage.getItem('imageColor')
    this.imageSrc = localStorage.getItem('imageSrc')
    if (localStorage.getItem('imageSrc') == null && localStorage.getItem('imageColor') == null)
      this.imageColor = 'linear-gradient(to right, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62))'
  }

  toggleMargin() {
    this.changeBg.nativeElement.classList.toggle('toggle-margin-left')
  }

  async changeImg(): Promise<void> {
    this.loaderBtn.nativeElement.querySelector('i').classList.add('fa-spin')
    const response = await fetch('https://source.unsplash.com/random/1920x1080')
    if (response.url === this.imageSrc) return this.changeImg()
    this.mainBG.nativeElement.style.background = ''
    this.imageSrc = response.url
    localStorage.setItem('imageSrc', this.imageSrc)
    localStorage.removeItem('imageColor')
  }

  imageLoaded() {
    this.loaderBtn.nativeElement.querySelector('i').classList.remove('fa-spin')
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Images } from 'src/app/models/giphy-response.interface';

@Component({
  selector: 'app-fullscreen-image',
  templateUrl: './fullscreen-image.page.html',
  styleUrls: ['./fullscreen-image.page.scss'],
})
export class FullscreenImagePage  {
  @Input() image: Images;

  constructor(private modalCtrl: ModalController) {}

  closeModal(){
    this.modalCtrl.dismiss();
  }
}

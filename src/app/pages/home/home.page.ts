import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Images } from 'src/app/models/giphy-response.interface';
import { ImageSearchService } from 'src/app/services/image-search.service';
import { FullscreenImagePage } from '../fullscreen-image/fullscreen-image.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchForm: FormGroup;
  images: Images[];

  /**
   * Creates an instance of HomePage.
   * @param {ImageSearchService} imageSearchService
   * @memberof HomePage
   */
  constructor(
    private readonly imageSearchService: ImageSearchService,

    private readonly modalCtrl: ModalController,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  async searchImages() {
    if (this.searchForm.valid) {
      const { term } = this.searchForm.value;

      this.images = await this.imageSearchService.getAll(term);
    }
  }

  async showFullScreenImage(image: Images) {
    const modal = await this.modalCtrl.create({
      component: FullscreenImagePage,
      componentProps: {
        image,
      },
    });
    return await modal.present();
  }

  private initForm() {
    const term: FormControl = new FormControl('', [Validators.required]);

    this.searchForm = new FormGroup({
      term,
    });
  }
}

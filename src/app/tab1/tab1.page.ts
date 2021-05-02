import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  images:any = [];

  constructor(private sanitizer: DomSanitizer) {
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      saveToGallery: false,
      promptLabelCancel: 'Mégsem',
      promptLabelHeader: 'Test',
      promptLabelPhoto: 'Fotó kiválasztása',
      promptLabelPicture: 'Fényképezés'
    });

    let securedImage = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    this.images.push(securedImage);
  }

}

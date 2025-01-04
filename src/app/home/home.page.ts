import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonSearchbar,
IonContent, IonButton, IonMenuButton } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { WebIntent } from '@ionic-native/web-intent/ngx'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonButton, IonSearchbar,IonTitle, IonContent,IonicModule],
})
export class HomePage {
  constructor(private webIntent: WebIntent) {}
  getBrowserWebContent() {
    const options = { 
      action: this.webIntent.ACTION_VIEW, 
      url: 'https://www.google.com', 
      type: 'text/html' 
    };
    this.webIntent.startActivity(options)
    .then(
      () => console.log('Successfully opened app'),
      (error) => console.error('Error opening app:', error)
    )
  }
}

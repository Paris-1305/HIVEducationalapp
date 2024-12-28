import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonContent,IonMenuButton,IonSearchbar,
  IonItem, IonHeader, IonTitle,IonList,IonToolbar,IonButtons,
 } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonMenu,IonButtons,IonMenuButton,IonList,IonToolbar,
    IonHeader,IonTitle,IonItem, IonContent,IonSearchbar],
})
export class AppComponent {
  constructor() {}
}

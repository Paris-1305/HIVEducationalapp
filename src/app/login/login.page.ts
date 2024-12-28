import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonItem, IonInput, IonIcon, 
  IonToolbar, IonList, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton,
    CommonModule, FormsModule, IonList, IonItem, IonInput
  ]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

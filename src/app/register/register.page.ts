import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonLabel, IonButton, IonSelectOption,
  IonTitle, IonToolbar , IonList} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,IonItem, IonLabel, IonButton, IonSelectOption,
    IonList, IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {
  formData = {
    name: '',
    gender: '',
    age: null,
    education: '',
    maritalStatus: '',
    location: '',
    hivStatus: '',
  };
  submitForm() {
    console.log('Form Submitted:', this.formData);
    // Add your API call or further form processing logic here
  }
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IonContent, IonHeader, IonTitle, IonItem, IonInput, IonIcon, IonRow, IonCol,
 IonLabel, IonToolbar, IonList, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,  IonButton,
  IonLabel,IonRow, IonCol, CommonModule, FormsModule,  IonItem, IonInput
  ]
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
  }
  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/home']); // Navigate to the protected page (home)
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while logging in';
        console.error(error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonLabel, IonButton, IonSelectOption,
  IonTitle, IonToolbar,IonRow,IonCol , IonList} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,IonItem, IonLabel, IonButton, 
    IonRow,IonCol ,  IonToolbar, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {
  email: string = '';            
  password: string = '';         
  name: string = '';             
  userId: string = '';           
  age: number = 0;               
  gender: string = '';           
  educationLevel: string = '';   
  healthStatus: string = '';     
  errorMessage: string = '';   
  ngOnInit() {
  }
  constructor(public authService: AuthService, public router: Router) {}

  register() {
    const userData = {
      email: this.email,
      password: this.password,
      name: this.name,
      userId: this.userId, // Generate or assign dynamically
      age: this.age,
      gender: this.gender,
      educationLevel: this.educationLevel,
      healthStatus: this.healthStatus,
    };
   
      // Call the register method of AuthService, passing individual parameters
      this.authService.register(
        this.email,
        this.password,
        this.name,
        this.userId,
        this.age,
        this.gender,
        this.educationLevel,
        this.healthStatus
      ).subscribe(
        (response) => {
          if (response.success) {
            this.router.navigate(['/login']); // Redirect to login page after successful registration
          } else {
            this.errorMessage = 'Registration failed';
          }
        },
        (error) => {
          this.errorMessage = 'An error occurred during registration';
          console.error(error);
        }
      );
    }
    
  
}

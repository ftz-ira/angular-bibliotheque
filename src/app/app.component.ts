import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    
    var firebaseConfig = {
      apiKey: "AIzaSyDZkD62h95abDVhHNw8Eu3OzSq87MvkrU4",
      authDomain: "angular-bibliotheque-e2652.firebaseapp.com",
      databaseURL: "https://angular-bibliotheque-e2652.firebaseio.com",
      projectId: "angular-bibliotheque-e2652",
      storageBucket: "",
      messagingSenderId: "390164877037",
      appId: "1:390164877037:web:88fa9db33a2e7f99"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  
}

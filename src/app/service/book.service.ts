import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book';
import * as firebase from 'firebase/app';
import { promise } from 'protractor';
import { ConsoleReporter } from 'jasmine';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
   }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    console.log(this.books);
    firebase.database().ref('/books').set(this.books).then(
      () => {
        console.log('then');
      },(error) => {
        console.log(" ----> Error " + error );
      }
    );
    //firebase.database().ref('/').push(this.books);
   
  }

  getBooks() {
    firebase.database().ref('/books')
    .on('value', (data: firebase.database.DataSnapshot) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  getBook(id: number) {
    return new Promise(
      (resolve, reject) => {
          firebase.database().ref('/books/'+ id).once('value').then(
            (data: firebase.database.DataSnapshot) => {
              resolve(data.val());
            }, ( error ) => {
              reject(error);
            }
          );
      }
    );
  }

  newBook(book: Book) {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        ()=> {
          console.log('photo supprimée');
        },
        (error) => {
          console.log('could not remove photo -> ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref().child('images/' + almostUniqueFileName + file.name).put(file);

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement d\'image : '+ error);
            reject();
          },
          () => {
            console.log('mux');
            resolve(upload.snapshot.downloadURL);
          }
          );
      }
    );
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {BookService} from '../../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit , OnDestroy{
  books: Book[];
  booksSubscription: Subscription;

  constructor(private bookService: BookService, private router: Router) {
  }

  ngOnInit() {
    this.booksSubscription = this.bookService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.bookService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.bookService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books/book', 'view', id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}

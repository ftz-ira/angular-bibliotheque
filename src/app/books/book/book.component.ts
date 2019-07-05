import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../service/book.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book: Book;

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) {
  }

  ngOnInit() {
    this.book = new Book('', '');
    const id = this.route.snapshot.params.id;
    this.bookService.getBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}

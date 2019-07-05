import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService} from 'src/app/service/book.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileUploaded: boolean = false;
  fileUrl: string;
  fileIsUploading: boolean= false;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.bookForm = this.formBuilder.group( {
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }

  onSaveBook(){
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;

    const newBook = new Book(title, author);
    newBook.synopsis = synopsis;

    if(this.fileUrl && this.fileUrl !== ''){
      newBook.photo = this.fileUrl;
    }
    this.bookService.newBook(newBook);
    this.router.navigate(['/books']);

  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
}

  detectFiles(event) {
      this.onUploadFile(event.target.files[0]);
  }

  }





import { CommonModule } from '@angular/common';
import { ItemService } from './../item.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
  providers: [ItemService]
})
export class ItemListComponent implements OnInit {
allUser: any;

constructor(private itemService: ItemService){}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.itemService.getAll().subscribe((response) => {
    this.allUser = response;
    console.table(this.allUser)
  },
  (err) =>{});
}

getAllUser(){}
getUserById(){}
createUser(){}
}

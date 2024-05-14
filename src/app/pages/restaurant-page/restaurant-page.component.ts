import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Restaurant } from '../../models/Restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../models/Table';
import { PopupService } from '../../services/popup.service';
import { AddTableComponent } from '../../components/add-table/add-table.component';
import { DeleteModel } from '../../models/DeleteModel';
import { VerifyDeleteComponent } from '../../components/verify-delete/verify-delete.component';


@Component({
  selector: 'app-restaurant-page',
  standalone: true,
  imports: [],
  templateUrl: './restaurant-page.component.html',
  styleUrl: './restaurant-page.component.scss'
})


export class RestaurantPageComponent {

  id: string = "";
  restaurant!: Restaurant;
  tables?: Table[];
  constructor(private db: DbService, private router: ActivatedRoute, private popup: PopupService) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    })

    this.db.GetRestaurantById(this.id).subscribe(response => {
      this.restaurant = response;
    })
    
    this.db.GetTables(this.id).subscribe(response => {
      this.tables = response;
    })
  }

  openPopup(id: string) {
    this.popup.openPopup(AddTableComponent, id)
  }

  onDelete(restaurantId: string, tableId: string) {
    let deleteModel: DeleteModel = {
      type: "table",
      value: {
        restaurantId,
        tableId
      }
    };
    this.popup.openPopup(VerifyDeleteComponent, deleteModel);
  }

}

import { Component, OnInit } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { ItemsService } from "../items.service";
import { DataItem } from "../items";

let test = [
    {
        name: "Leonardo La Fontaine",
        id: 4,
        position: "Defender",
    },
    {
        name: "Miguelangel La Fontaine",
        id: 2,
        position: "Middle Center",
    },
    {
        name: "Ernesto La Fontaine",
        id: 1,
        position: "Goalkeeper",
    },
];

let test2 = [
    {
        name: "Leonardo La Fontaine",
        id: 21,
        position: "Defender",
    },
    {
        name: "Miguelangel La Fontaine",
        id: 2,
        position: "Middle Center",
    },
    {
        name: "Ernesto La Fontaine",
        id: 1,
        position: "Goalkeeper",
    },
];

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ["./items.component.css"],
})
export class ItemsComponent implements OnInit {
    private items$: BehaviorSubject<Array<DataItem>> = new BehaviorSubject([]);

    constructor(private itemsService: ItemsService) {
        this.itemsService.getItems();
    }

    ngOnInit(): void {
        this.itemsService.items.subscribe((items) => {
            if (items.length > 0) {
                this.items$.next(items);
            }
        });
    }
}

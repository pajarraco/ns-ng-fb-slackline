import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { alert } from "tns-core-modules/ui/dialogs";

import { DataItem, Item } from "../items";
import { ItemsService } from "../items.service";

@Component({
    selector: "ns-add-item",
    templateUrl: "./add-item.component.html",
    styleUrls: ["./add-item.component.css"],
})
export class AddItemComponent implements OnInit {
    item: DataItem;
    action: string;
    constructor(
        private routerExtensions: RouterExtensions,
        private activeRoute: ActivatedRoute,
        private itemService: ItemsService
    ) {
        this.item = new Item();
    }

    ngOnInit(): void {
        this.itemService.itemToEdit.subscribe((item) => {
            if (item) {
                this.item = item;
                this.action = "update";
            } else {
                this.item = new Item();
                this.action = "add";
            }
        });
    }

    onSave() {
        // console.log(this.item);
        if (!this.item.name || !this.item.position) {
            alert("Please provide both an email address and password.");
            return;
        } else {
            if (this.action === "add") {
                this.itemService.add(this.item);
            } else {
                this.itemService.update(this.item);
            }
            this.routerExtensions.navigate(["../default"], {
                relativeTo: this.activeRoute,
                animated: true,
                transition: {
                    name: "slideRight",
                    duration: 200,
                    curve: "easeIn",
                },
            });
        }
    }
}

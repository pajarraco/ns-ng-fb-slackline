import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { alert } from "tns-core-modules/ui/dialogs";

import { DataItem, Item } from "../items";

@Component({
    selector: "ns-add-item",
    templateUrl: "./add-item.component.html",
    styleUrls: ["./add-item.component.css"],
})
export class AddItemComponent implements OnInit {
    item: DataItem;
    constructor(
        private routerExtensions: RouterExtensions,
        private activeRoute: ActivatedRoute
    ) {
        this.item = new Item();
    }

    ngOnInit(): void {}

    onSave() {
        console.log(this.item);
        if (!this.item.id || !this.item.name || !this.item.position) {
            alert("Please provide both an email address and password.");
            return;
        }

        // this.routerExtensions.navigate(["../default"], {
        //     relativeTo: this.activeRoute,
        //     animated: true,
        //     transition: {
        //         name: "slideRight",
        //         duration: 200,
        //         curve: "easeIn",
        //     },
        // });
    }
}

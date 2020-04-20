import { Component, OnInit } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { ItemsService } from "../items.service";
import { DataItem } from "../items";
import { ListViewEventData } from "nativescript-ui-listview";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ["./items.component.css"],
})
export class ItemsComponent implements OnInit {
    items$: Observable<Array<DataItem>>;

    constructor(
        private itemsService: ItemsService,
        private routerExtensions: RouterExtensions,
        private activeRoute: ActivatedRoute
    ) {
        this.items$ = this.itemsService.items;
        this.itemsService.get();
    }

    ngOnInit(): void {
        // this.itemsService.items.subscribe((items) => {
        //     if (items.length > 0) {
        //         console.log(items);
        //     }
        // });
    }

    onAdd() {
        console.log("Add");
        this.routerExtensions.navigate(["../add"], {
            relativeTo: this.activeRoute,
            animated: true,
            transition: {
                name: "slideLeft",
                duration: 200,
                curve: "easeIn",
            },
        });
    }

    onPullToRefresh(args: ListViewEventData) {
        console.log("Pull to Refresh");
        this.itemsService.get();

        const listView = args.object;
        listView.notifyPullToRefreshFinished();
    }
}

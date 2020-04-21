import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { ItemsService } from "../items.service";
import { DataItem } from "../items";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { View } from "tns-core-modules/ui/core/view";
import { Label } from "tns-core-modules/ui/label";
import { Frame } from "tns-core-modules/ui/frame/frame";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { confirm } from "tns-core-modules/ui/dialogs";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ["./items.component.css"],
})
export class ItemsComponent implements OnInit {
    items$: Observable<Array<DataItem>>;
    @ViewChild("myListView", { read: RadListViewComponent, static: false })
    myListViewComponent: RadListViewComponent;

    constructor(
        private itemsService: ItemsService,
        private routerExtensions: RouterExtensions,
        private activeRoute: ActivatedRoute
    ) {
        this.items$ = this.itemsService.items;
    }

    ngOnInit(): void {
        this.itemsService.get();
        // this.itemsService.items.subscribe((items) => {
        //     if (items.length > 0) {
        //         console.log(items);
        //     }
        // });
    }

    public onCellSwiping(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const currentItemView = args.object;
    }

    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args["object"];
        const rightItem = swipeView.getViewById<View>("right-stack");
        swipeLimits.left = 0;
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    public onSwipeCellFinished(args: ListViewEventData) {}

    public onEditSwipeClick(args) {
        const item = args.object.bindingContext;
        console.log("Right Edit swipe click", item);
        this.itemsService.setItemToEdit(item);
        this.onAdd();
        this.myListViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onDeleteSwipeClick(args) {
        const item = args.object.bindingContext;
        console.log("Right Delete swipe click", item);
        confirm({
            title: "Delete Item",
            message: "Are you sure?",
            okButtonText: "DELETE",
            cancelButtonText: "Cancel",
        }).then((result) => {
            console.log("Dialog result: " + result);
            if (result) {
                this.itemsService.delete(item);
                this.itemsService.get();
            }
        });
        this.myListViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onLayoutTap(args) {
        const message =
            "Tap on Layout for item: " +
            (<DataItem>args.object.bindingContext).name;
        console.log(message);
        this.myListViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onLabelTap(args) {
        const message = "Tap on Title: " + (<Label>args.object).text;
        console.log(message);
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

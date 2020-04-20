import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ItemsComponent } from "./items/items.component";
import { AddItemComponent } from "./add-item/add-item.component";

const routes: Routes = [
    { path: "default", component: ItemsComponent },
    { path: "add", component: AddItemComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
})
export class ItemsRoutingModule {}

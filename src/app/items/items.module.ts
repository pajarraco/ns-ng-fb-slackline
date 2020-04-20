import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { ItemsRoutingModule } from "./items-routing.module";
import { ItemsComponent } from "./items/items.component";
import { AddItemComponent } from "./add-item/add-item.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ItemsRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
    ],
    declarations: [ItemsComponent, AddItemComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class ItemsModule {}

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/(homeTab:home/default//itemsTab:items/default)",
        pathMatch: "full",
    },
    {
        path: "home",
        component: NSEmptyOutletComponent,
        loadChildren: () =>
            import("~/app/home/home.module").then((m) => m.HomeModule),
        outlet: "homeTab",
    },
    {
        path: "items",
        component: NSEmptyOutletComponent,
        loadChildren: () =>
            import("~/app/items/items.module").then((m) => m.ItemsModule),
        outlet: "itemsTab",
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}

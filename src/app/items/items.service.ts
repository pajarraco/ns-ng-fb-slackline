import { Injectable } from "@angular/core";
import { firestore } from "nativescript-plugin-firebase";
import { BehaviorSubject, Observable } from "rxjs";
import { DataItem, Item } from "./items";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root",
})
export class ItemsService {
    itemsCollection: firestore.CollectionReference;
    private _items: BehaviorSubject<Array<DataItem>> = new BehaviorSubject([]);
    items: Observable<Array<DataItem>> = this._items.asObservable();
    private _itemToEdit: BehaviorSubject<DataItem> = new BehaviorSubject(null);
    itemToEdit: Observable<DataItem> = this._itemToEdit.asObservable();

    constructor() {
        console.log("service constructed");
        this.itemsCollection = firebase.firestore.collection("items");
    }

    delete(item: DataItem) {
        this.itemsCollection
            .doc(item.id)
            .delete()
            .then((documentRef) => console.log("DocRef: ", documentRef))
            .catch((err) => console.log(err));
    }

    update(item: DataItem) {
        this.itemsCollection
            .doc(item.id)
            .update({
                name: item.name,
                position: item.position,
            })
            .then((documentRef) => console.log("DocRef: ", documentRef))
            .catch((err) => console.log(err));
    }

    get() {
        // console.log("Get call");

        this.itemsCollection
            .orderBy("name", "asc")
            .get()
            .then((docs: firestore.QuerySnapshot) => {
                // console.log("Document: ", docs);
                const itemsData = [];
                docs.forEach((item: firestore.DocumentSnapshot) => {
                    const data = item.data();
                    data.id = item.id;
                    itemsData.push(data);
                });
                this._items.next(itemsData);
            })
            .catch((err) => console.log(err));
    }

    add(item: DataItem) {
        console.log("add call");
        this.itemsCollection
            .add(item)
            .then((documentRef) => console.log("DocRef: ", documentRef))
            .catch((err) => console.log(err));
    }

    setItemToEdit(item: DataItem) {
        this._itemToEdit.next(item);
    }

    getItems() {
        console.log("Service call");

        this.itemsCollection.onSnapshot(
            {},
            (snapshot: firestore.QuerySnapshot) => {
                const source = snapshot.metadata.fromCache
                    ? "local cache"
                    : "server";
                console.log("Data came from " + source);
                // console.log(
                //     "Has pending writes? " + snapshot.metadata.hasPendingWrites
                // );
                const itemsData = [];
                snapshot.forEach((item) => itemsData.push(item.data()));
                this._items.next(itemsData);
                // snapshot.forEach((item) => console.log(item.data()));
            },
            (error) => console.log(error)
        );
    }
}

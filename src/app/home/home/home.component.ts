import { Component, OnInit } from "@angular/core";

import { storage } from "nativescript-plugin-firebase";
import { File } from "tns-core-modules/file-system";
import { Image } from "tns-core-modules/ui/image";
import { isAndroid, isIOS } from "tns-core-modules/platform";

import * as camera from "nativescript-camera";

const APPSPOT_BUCKET_URL = "gs://test-mobile-2.appspot.com";
@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
    imageUrl: string;
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        camera.requestPermissions();
    }

    uploadFile() {
        camera
            .takePicture()
            .then((imageAsset) => {
                console.log("Result is an image asset instance: ", imageAsset);
                var image = new Image();
                image.src = imageAsset;

                console.log("image: ", JSON.stringify(image, null, 2));

                let path;
                let platform;
                if (isAndroid) {
                    platform = "Android";
                    path = image.src._android;
                } else if (isIOS) {
                    platform = "iOS";
                    path = image.src._ios;
                }

                let filename = path.split("\\").pop().split("/").pop();

                const metadata = {
                    contentType: "image/jpeg",
                    contentLanguage: "en",
                    customMetadata: {
                        platform: platform,
                    },
                };

                storage
                    .uploadFile({
                        bucket: APPSPOT_BUCKET_URL,
                        remoteFullPath: "uploads/images/" + filename,
                        localFile: File.fromPath(image.src._android),
                        localFullPath: image.src._android,
                        onProgress: (status) => {
                            console.log("status", status);
                            console.log(
                                "Uploaded fraction: " + status.fractionCompleted
                            );
                            console.log(
                                "Percentage complete: " +
                                    status.percentageCompleted
                            );
                        },
                        metadata,
                    })
                    .then((uploadedFile) => {
                        storage
                            .getDownloadUrl({
                                bucket: APPSPOT_BUCKET_URL,
                                remoteFullPath: "uploads/images/" + filename,
                            })
                            .then((url) => {
                                this.imageUrl = url;
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        console.log(
                            "File uploaded: " + JSON.stringify(uploadedFile)
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log("Error -> " + err.message);
            });
    }
}

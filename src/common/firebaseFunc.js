import { useFileDialog } from "@vueuse/core";
import { ref as storageRef } from "firebase/storage";
import { useFirebaseStorage, useStorageFile,useStorageFileUrl  } from "vuefire";


export function getImgLink(urlImg){
    const storage = useFirebaseStorage();
    const mountainFileRef = storageRef(storage, urlImg);
    const { url, refresh } = useStorageFileUrl(mountainFileRef);
    return url;
}
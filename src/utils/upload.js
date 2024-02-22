// import { getStorage, ref, uploadBytes } from "firebase/storage";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

// const storage = getStorage();
const uploadFile = async (file) => {
  const metadata = {
    contentType: file.type,
  };
  const storageRef = ref(storage, file.name);
  const response = await uploadBytes(storageRef, file, metadata);
  const downloadURL = await getDownloadURL(response.ref);
  return downloadURL;
};

export default uploadFile;

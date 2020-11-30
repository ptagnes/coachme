import React, { useState } from "react";
import firebase from "../firebase/firebase";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

function ProfilePic({
  setFileUrl,
  exForm,
}: {
  setFileUrl: (fileUrl: any) => void;
  exForm?: any;
}) {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const handleChangeUpload = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | any>
  ) => {
    const target = e.target as HTMLInputElement | any;
    let selectedFile = (target.files as FileList)[0];
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setFile(selectedFile);
        setFileError(null);
        const storageRef = firebase.firebaseStorage().ref(selectedFile.name);
        storageRef.put(selectedFile).on(
          "state_changed",
          (snap) => {
            let percentage = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            setProgress(percentage);
          },
          (err: any) => {
            setError(err);
          },
          async () => {
            const downloadUrl = await storageRef.getDownloadURL();
            setUrl(downloadUrl);
            setFileUrl(downloadUrl);
            if (exForm) {
              console.log("exForm");
              console.log(exForm);
              exForm.setState({ fileUrl: downloadUrl });
            }
          }
        );
      } else {
        setFile(null);
        setFileError("Please select an image file (png or jpg)");
      }
    }
  };

  return (
    <>
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={handleChangeUpload}
        />
        <Fab
          color="primary"
          size="small"
          component="span"
          aria-label="add"
          onChange={handleChangeUpload}
        >
          <AddIcon />
        </Fab>
      </label>
      {/* {url && <div>{url}</div>} */}
      {fileError && <div>{fileError}</div>}
      {error && <div>{error}</div>}
      {/* {progress && <div>{progress}</div>} */}
    </>
  );
}

export default ProfilePic;

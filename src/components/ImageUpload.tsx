import React, { useState } from "react";
import firebase from "../firebase/firebase";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

function ProfilePic({
  setImgFile,
  setFileUrl,
}: {
  setImgFile: (file: any) => void;
  setFileUrl: (fileUrl: any) => void;
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
        setImgFile(selectedFile);
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
          }
        );
      } else {
        setFile(null);
        setImgFile(null);
        setFileError("Please select an image file (png or jpg)");
      }
    }
  };
  return (
    <>
      <label htmlFor="upload-photo" style={{ position: "absolute" }}>
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={handleChangeUpload}
        />
        {/* <Fab
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
          <AddIcon /> Upload photo
        </Fab>
        <br />
        <br /> */}
        <Fab
          color="primary"
          size="small"
          component="span"
          aria-label="add"
          onChange={handleChangeUpload}
        >
          <AddIcon />
        </Fab>
        {/* <Button
          color="secondary"
          variant="contained"
          component="span"
          onChange={handleChangeUpload}
        >
          Upload button
        </Button>{" "} */}
      </label>
      {/* {url && <div>{url}</div>} */}
      {fileError && <div>{fileError}</div>}
      {error && <div>{error}</div>}
      {/* {progress && <div>{progress}</div>} */}
    </>
  );
}

export default ProfilePic;

import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import useProgressiveImg from "../useProgressiveImg ";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background:
        "url(https://newevolutiondesigns.com/images/freebies/city-wallpaper-18.jpg)",
      backgroundSize: "cover",
      height: "100vh",
    },
    cover: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 255, 0.2)",
      zIndex: 0,
    },
    container: {
      maxWidth: "400px",
      height: "500px",
      margin: "3rem auto",
      textAlign: "center",
      background: "#dddddd7d",
      padding: "1rem",
      borderRadius: "20px",
    },
    user: {
      width: "110px",
      height: "110px",
      borderRadius: "100%",
      border: "5px solid white",
    },
  })
);
export default function Profile() {
  const [src, { blur }] = useProgressiveImg(
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/small.jpg?alt=media&token=f5234a59-cedc-426d-8336-e1272f1afb38",
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/agi.jpg?alt=media&token=42a7bfad-641f-460e-8da6-46e56504c2e6"
  );
  const classes = useStyles();
  return (
    <div className={`${classes.root} bp`}>
      <div className={classes.cover}></div>
      <div className={classes.container}>
        <div className="header">
          <img
            src={src}
            className={classes.user}
            alt="user"
            style={{
              filter: blur ? "blur(20px)" : "none",
              transition: blur ? "none" : "filter 0.3s ease-out",
            }}
          />

          <h4 className="name">Agnes Cort</h4>
          <h4 className="work">Coach | Grupp trainer | PT</h4>
          <h4 className="social">Instagram</h4>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <small>Las summit</small> <p>Basecamp</p>
            </div>
            <div>
              <small>Next challenge</small> <p>Kirkjufell</p>
            </div>
          </div>
        </div>
        <div className="middle"></div>
      </div>
    </div>
  );
}

import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import useProgressiveImg from "../useProgressiveImg ";
import { AuthContext } from "../../firebase/Authentication";
import ProfileContent from "./ProfileContent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: `url(${process.env.PUBLIC_URL}/images/profilebg.png)`,
      backgroundSize: "cover",
      // minHeight: "100%",
      // height: "100vh",
    },
    cover: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100vh",
      // background: "rgba(0, 0, 255, 0.1)",
      background: "rgb(27 27 64 / 52%)",
      zIndex: 0,
    },
    container: {
      textAlign: "center",
      background: "#dddddd4a",
      // color: "#141447",
      padding: "1rem",
      borderRadius: "20px",
      zIndex: 0,
      position: "relative",
      width: "89vw",
      [theme.breakpoints.up("sm")]: {
        maxWidth: "500px",
        margin: "0 auto",
      },
    },
    header: {
      fontFamily: "Lobster",
      fontSize: "1.2rem",
      lineHeight: "1",
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
  const { currentUser, isAdmin } = React.useContext(AuthContext);
  const [src, { blur }] = useProgressiveImg(
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/small.jpg?alt=media&token=f5234a59-cedc-426d-8336-e1272f1afb38",
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/agi.jpg?alt=media&token=42a7bfad-641f-460e-8da6-46e56504c2e6"
  );
  const classes = useStyles();
  return (
    <div className={`${classes.root} bp`}>
      <div className={classes.cover}></div>
      <div className={classes.container}>
        <div>
          <img
            src={src}
            className={classes.user}
            alt="user"
            style={{
              filter: blur ? "blur(20px)" : "none",
              transition: blur ? "none" : "filter 0.3s ease-out",
            }}
          />

          <h4 className={classes.header}>
            {currentUser && currentUser.displayName}
          </h4>
          <h4 className={classes.header}>{currentUser && currentUser.email}</h4>
          {isAdmin && <h4>Admin</h4>}
          <h4 className="work">Coach | Grupp trainer | PT</h4>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#fff",
              color: "#333",
              padding: "0.6rem 1rem 0px",
            }}
          >
            <div>
              <small>Last summit</small> <p>Basecamp</p>
            </div>
            <div>
              <small>Next challenge</small> <p>Kirkjufell</p>
            </div>
          </div>
        </div>
        <div className="middle">
          <ProfileContent />
        </div>
      </div>
    </div>
  );
}

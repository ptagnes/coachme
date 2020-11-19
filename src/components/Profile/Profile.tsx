import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ProfileContent from "./ProfileContent";

import { AuthContext } from "../../firebase/Authentication";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: `url(${process.env.PUBLIC_URL}/images/profilebg.png)`,
      backgroundSize: "cover",
    },
    cover: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100vh",
      background: "rgb(27 27 64 / 52%)",
      zIndex: 0,
    },
    container: {
      textAlign: "center",
      background: "#dddddd4a",
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

function Profile() {
  const { currentUser, isAdmin } = React.useContext(AuthContext);

  const src =
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/small.jpg?alt=media&token=f5234a59-cedc-426d-8336-e1272f1afb38";
  const classes = useStyles();

  return (
    <div className={`${classes.root} bp`}>
      <div className={classes.cover}></div>
      <div className={classes.container}>
        <div>
          <img src={src} className={classes.user} alt="user" />

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

export default Profile;

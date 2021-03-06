import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ProfileContent from "./ProfileContent";
import ImageUpload from "../ImageUpload";
import { AuthContext } from "../../firebase/Authentication";
import { editUser } from "../../redux/actions/usersActions";
import { fetchUserStartAsync } from "../../redux/actions/usersActions";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: `url(${process.env.PUBLIC_URL}/images/bg/bg3.jpg)`,
      backgroundSize: "cover",
      position: "relative",
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
    header: {
      fontFamily: "Lobster",
      fontSize: "1.9rem",
      lineHeight: "1",
      marginTop: "0.5rem",
      marginBottom: "1.5rem",
      color: "#28294a9e",
    },
    user: {
      width: "110px",
      height: "110px",
      borderRadius: "100%",
      border: "5px solid white",
      backgroundSize: "cover",
      margin: "0 auto",
    },
  })
);

function Profile({
  editUser,
  fetchUserStartAsync,
  userData,
}: {
  editUser: (id: string, updates: any) => void;
  fetchUserStartAsync: (id: string) => void;
  userData?: any;
}) {
  const { currentUser } = React.useContext(AuthContext);
  const [fileUrl, setFileUrl] = useState<string | null>();
  let id: string;
  if (currentUser) {
    id = currentUser.uid;
  }
  // const src =
  // "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/defuserimg.png?alt=media&token=6efd3c9d-1211-4cd6-a730-fcf77bbeed0e";
  const classes = useStyles();
  const { users } = userData;

  React.useEffect(() => {
    fetchUserStartAsync(id);
    if (fileUrl) {
      console.log("the uploaded file:");
      console.log(fileUrl);
      const update = { userImage: fileUrl };
      editUser(id, update);
      fetchUserStartAsync(id);
    }
  }, [fileUrl, fetchUserStartAsync, editUser]);

  return (
    <div className={`${classes.root} bp`}>
      <div className={classes.cover}></div>
      <div className="profile-container">
        <div>
          {users && users.userImage ? (
            <div
              className={classes.user}
              style={{ backgroundImage: `url(${users.userImage})` }}
            ></div>
          ) : (
            <AccountCircleIcon style={{ fontSize: "90px" }} />
          )}
          <ImageUpload setFileUrl={setFileUrl} />
          <h4 className={classes.header}>{users && users.displayName}</h4>
        </div>
        <div className="middle">
          <ProfileContent />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  userData: state.usersState,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  editUser: (id: string, updates: any) => dispatch<any>(editUser(id, updates)),
  fetchUserStartAsync: (id: string) => dispatch<any>(fetchUserStartAsync(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

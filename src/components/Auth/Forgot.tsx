import React from "react";
import app from "../../firebase/firebase";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

function Forgot() {
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState("");
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);
  const [passwordResetError, setPasswordResetError] = React.useState(null);

  async function handleResetPassword() {
    try {
      await app.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (err) {
      console.error("Error sending email", err);
      setPasswordResetError(err.message);
      setIsPasswordReset(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs" className="bp">
      <h2>Reset password</h2>

      <TextField
        onChange={(event) => setResetPasswordEmail(event.target.value)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="email"
        label="Provide your account email"
        type="email"
        id="email"
        autoComplete="current-password"
      />

      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleResetPassword}
      >
        Reset password
      </Button>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </Container>
  );
}

export default Forgot;

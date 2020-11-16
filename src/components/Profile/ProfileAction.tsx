import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";

function ProfileAction() {
  return (
    <Wrapper>
      <Link to="/profiletoanimatein">
        <SettingsIcon style={{ width: "50px", cursor: "pointer" }} />
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  a {
    text-decoration: none;
    font-size: 20px;
    color: #ffffff;
  }
`;

export default ProfileAction;

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../../redux/selectors/directoryselectors";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import useProgressiveImg from "../../useProgressiveImg ";

const Directory = ({ sections }: { sections: any }) => {
  /* eslint-disable */
  const [src, { blur }] = useProgressiveImg(
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/small.jpg?alt=media&token=f5234a59-cedc-426d-8336-e1272f1afb38",
    "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/agi.jpg?alt=media&token=42a7bfad-641f-460e-8da6-46e56504c2e6"
  );
  /* eslint-enable */
  return (
    <>
      {sections.map(
        ({
          id,
          title,
          linkUrl,
          imageUrl,
          ...otherSectionProps
        }: {
          id: number;
          title: string;
          linkUrl: string;
          imageUrl: string;
        }) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={id}>
            <Card>
              <Link
                to={`/${linkUrl}`}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="training"
                    height="180"
                    style={{
                      filter: blur ? "blur(20px)" : "none",
                      transition: blur ? "none" : "filter 0.3s ease-out",
                    }}
                    image={`${process.env.PUBLIC_URL}/images/${imageUrl}`}
                    title={title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        )
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);

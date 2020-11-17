import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import WorkoutItems from "./WorkoutItems";
import { selectCollection } from "../../redux/selectors/workoutSelectors";

const CollectionPage = ({ collection }: { collection: any }) => {
  const { title, items } = collection;
  return (
    <div className="bp">
      <h2>{title}</h2>
      <Grid>
        {items.map((item: any) => (
          <WorkoutItems key={item.id} item={item} />
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);

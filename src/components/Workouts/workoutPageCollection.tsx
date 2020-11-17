import React from "react";
import { connect } from "react-redux";

import WorkoutItems from "./WorkoutItems";

import { selectCollection } from "../../redux/selectors/workoutSelectors";

const CollectionPage = ({ collection }: { collection: any }) => {
  const { title, items } = collection;
  console.log(collection);
  return (
    <div className="bp">
      <h2>These are the routines json subcategories</h2>
      <p>{title}</p>
      <section>
        {items.map((item: any) => (
          <WorkoutItems key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => ({
  collection: selectCollection("hiit")(state), //ownProps.match.params.collectionId
});

export default connect(mapStateToProps)(CollectionPage);

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionsForPreview } from "../../redux/selectors/workoutSelectors";

const CollectionsOverview = ({ collections }: { collections: any }) => (
  <div className="bp">
    <h1>These are the titles of the workout routine top categories</h1>
    {collections.map(
      ({ id, title, ...otherCollectionProps }: { id: any; title: string }) => (
        //   <CollectionPreview key={id} {...otherCollectionProps} />
        <div key={id}>
          {id}
          <div>{title}</div>
        </div>
      )
    )}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);

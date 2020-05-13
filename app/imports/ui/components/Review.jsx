import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Comment, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Reviews } from '../../api/review/Reviews';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  handleClick = () => Reviews.remove(this.props.review._id)

  render() {
    return (
        <Comment>
          <Comment.Content>
            <Comment.Author>{this.props.review.title}</Comment.Author>
            <Comment.Metadata>
              <div><Rating icon='star' defaultRating={this.props.review.stars} maxRating={5} disabled /></div>
              <div>{this.props.review.date} by {this.props.review.name}</div>
            </Comment.Metadata>
            <Comment.Text>
              {this.props.review.experience}
            </Comment.Text>
          </Comment.Content>
        </Comment>
    );
  }
}

/** Require a document to be passed to this component. */
Review.propTypes = {
  review: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const ReviewContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Review);

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ReviewContainer);

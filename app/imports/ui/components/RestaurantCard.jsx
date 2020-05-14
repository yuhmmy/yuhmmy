import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button, Rating } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

class RestaurantCard extends React.Component {
  render() {
    return (
        <div>
          <div className="order-menu-item">
            <div className="flex justify-between">
              <div className="flex-auto">
            <span style={{ float: 'left', paddingRight: 5 }}>
              <Image src={this.props.image} avatar/>
            </span>
                <div style={{ fontWeight: 'bold', lineHeight: 0.95 }}>
                  {this.props.name}
                </div>
                <div className="secondary-text">
                  {this.props.address}
                </div>
              </div>
            </div>
            <br/>
            <div>
              <Rating maxRating={5} clearable defaultRating={4} />
            </div>
              <div>
              {this.props.description}
            </div>
            <br/>
            <Link to={`/menu/${this.props.id}`}>
              <Button basic compact inverted size="mini">
                Order
              </Button>
            </Link>
            <Link to={`/edit/${this.props.id}`}>
              <Button basic compact inverted size="mini">
                Edit
              </Button>
            </Link>
            <Link to={`/restaurantorder/${this.props.id}`}>
              <Button basic compact inverted size="mini">
                Queue
              </Button>
            </Link>
            <Link to={`/review/${this.props.id}`}>
            <Button basic compact inverted size="mini">
              Review
            </Button>
          </Link>
            <Link to={`/menuAdd/${this.props.id}`}>
              <Button basic compact inverted size="mini">
                Add
              </Button>
            </Link>
          </div>
        </div>
    );
  }
}

RestaurantCard.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.number,
  description: PropTypes.description,
};

export default withRouter(RestaurantCard);

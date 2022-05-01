import React, {Component} from 'react';
import Review from './Review.js';

class List extends Component {
    render()
    {
        return (
            <ul className="reviews__list">
                {this.props.reviews.sort((a,b) => b.date - a.date).map((review, index) => <Review index={index} review={review}/>)}
            </ul>
        );
    }
}

export default List;
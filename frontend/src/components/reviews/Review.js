import React, {Component} from 'react';

class Review extends Component {
    render()
    {
        return (
            <li key={this.props.index} className="reviews__list-item reset-list block-padding-vertical">
                <div className="review area">
                    <h3 className="review__title">{this.props.review.name}</h3>

                    {this.getDate(this.props.review.date)}

                    <div className="review__rating" style={{position: 'relative'}}>
                        {this.getStar(1)}
                        {this.getStar(2)}
                        {this.getStar(3)}
                        {this.getStar(4)}
                        {this.getStar(5)}
                    </div>

                    <div className="review__content">
                        {this.props.review.review}
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <button className='btn btn-primary' style={{marginRight: '20px'}}>Edit</button>
                        <button className='btn btn-danger'>Delete</button>
                    </div>
                </div>
            </li>
        );
    }

    getStar(rating)
    {
        return (
            <svg height="25" width="23" className="star" data-rating={rating}
                 data-active={parseInt(this.props.review.rating) === parseInt(rating)}>
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"/>
            </svg>
        );
    }

    getDate(date)
    {
        if (typeof date === 'object') {
            return (
                <span className="review__date">
                    Date: {date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()}
                </span>
            );
        }

    }
}

export default Review;
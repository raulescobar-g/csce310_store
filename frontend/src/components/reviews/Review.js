import React, {Component} from 'react';

class Review extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isEditing: false
        };
      }

    deleteReview(){
        fetch('http://localhost:5000/reviews/delete/' + this.props.review.reviewid,
        { method: 'DELETE' })
        .then(response => response.json())
    }

    onEditClick() {
        this.setState({isEditing: true});
    }

    render()
    {
        if (this.state.isEditing) {
            return (
                <form onSubmit={this.onSaveClick.bind(this)}>

                    {this.props.validation}
                    <div className="rating">
                        <span className="rating__prefix font-size-small">Rating</span>
                        {this.getStar(1)}
                        {this.getStar(2)}
                        {this.getStar(3)}
                        {this.getStar(4)}
                        {this.getStar(5)}
                    </div>

                    <input type="hidden" name="rating" defaultValue={this.props.review.rating} ref="rating"/>
                    <input type="text" defaultValue={this.props.review.name} name="name" placeholder="Name" ref="name"/>

                    <textarea name="review" defaultValue={this.props.review.review} placeholder="Please enter a review" ref="review"/>

                    <button className="button">
                        Edit Review
                    </button>
                </form>
            );
          }

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
                        <button className='btn btn-primary'  onClick={() => this.onEditClick()} style={{marginRight: '20px'}}>Edit</button>
                        <button className='btn btn-danger' onClick={() => this.deleteReview()}>Delete</button>
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

    onSaveClick(event) {
        event.preventDefault();
        const name2 = this.refs.name.value;
        const rating2 = this.refs.rating.value;
        const review2 = this.refs.review.value;
        fetch("http://localhost:5000/reviews/update/" + this.props.review.reviewid, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              productid : this.props.review.productid,
              name : name2,
              rating: rating2,
              review: review2,
              date: this.props.review.date
              })
          })
          this.setState({isEditing: false});
    }
}

export default Review;
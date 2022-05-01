import React, {Component} from 'react';
import Button from './Button.js';
import Star from './Star.js';

class Form extends Component {
    constructor()
    {
        super();

        this.state = {
            isActive: false,
            isSubmitted: false,
            rating: 1,
            name: '',
            review: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render()
    {
        return (
            <div className="review-form bg-white content-padding block-margin-top">

                <form className={this.state.isActive ? '' : 'hide'} onSubmit={this.props.submitForm}>

                    {this.props.validation}
                    <div className="rating">
                        <span className="rating__prefix font-size-small">Rating</span>
                        {this.getStar(1)}
                        {this.getStar(2)}
                        {this.getStar(3)}
                        {this.getStar(4)}
                        {this.getStar(5)}
                    </div>

                    <input type="hidden" name="rating" value={this.state.rating}/>
                    <input type="text" value={this.state.name} name="name" placeholder="Name"
                           onChange={this.handleInputChange}/>

                    <textarea name="review" value={this.state.review} placeholder="Please enter a review"
                              onChange={this.handleInputChange}/>

                    <button className="button">
                        Post Review
                    </button>
                </form>

                {this.showButton()}

            </div>
        )
    }

    showForm()
    {
        this.setState({...this.state, isActive: true});
    }

    showButton()
    {
        return <Button isActive={this.state.isActive} showForm={() => this.showForm()}/>;
    }

    getStar(rating)
    {
        return <Star
            rating={rating}
            isActive={this.state.rating === rating}
            onClick={() => this.clickOnStar(rating)}
        />;
    }

    clickOnStar(rating)
    {
        this.setState({...this.state, rating: rating});
    }

    handleInputChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({...this.state, [name]: value})
    }
}

export default Form;
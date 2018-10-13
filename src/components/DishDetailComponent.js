import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class Dish extends Component {

    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    render(){

    	if(this.props.dish !=null){
    	const dishC = this.props.dish.comments.map((comments) => {
        return (
        		<div key={comments.id}>
                      <CardBody>
                      	<CardText>{comments.comment} </CardText>
                      	<CardText>--{comments.author}, {new Intl.DateTimeFormat('en-US', 
                      		{ year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))} </CardText>
                      </CardBody>
               </div>
            );
        });
    
    return(
    	<div className="container">
            <div className="row">
            	
            	<div  className="col-12 col-md-5 m-1">
            		{this.renderDish(this.props.dish)}
            	</div>
            	<div  className="col-12 col-md-5 m-1">
            		
            			<CardTitle>Comments</CardTitle>
            				{dishC}
            		
            	</div>
            	
    		</div>
    	</div>
    	);
} else {
	return(<div></div>)
	}
}
}
export default Dish;
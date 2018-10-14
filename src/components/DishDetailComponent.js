import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

    function RenderDish({dish}) {
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


    const DishDetail = (props) =>{

    	if(props.comments !=null){
    	const dishC = props.comments.map((comments) => {
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
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>
            </div>        
            <div className="row">
            	
            	<div  className="col-12 col-md-5 m-1">
            		<RenderDish dish= {props.dish} />
            	</div>
            	<div  className="col-12 col-md-5 m-1">
            		
            			<CardTitle>Comments</CardTitle>
            				{dishC}
            		
            	</div>
            	
    		</div>
    	</div>
    	);
} else {
	return(<div></div>);
	}
}

export default DishDetail;
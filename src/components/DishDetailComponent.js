import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, 
     ModalBody, Form, Input, FormGroup, Label, Col, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
//import { Control, LocalForm, Errors } from 'react-redux-form'

class DishDetail extends Component {
    constructor(props){
		super(props);
		this.state = {
            yourName: '',
            ratingValue: '',
            message: '',
            isModalOpen: false,
            touched: {
                yourName: false
            }

		};
    this.toggleModal= this.toggleModal.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    }

    validate(yourName){
        const errors = {
            yourName: ''
        };
         if(this.state.touched.yourName && yourName.length <3)
            errors.yourName= "First Name should be => 3 characters";
        else if(this.state.touched.yourName && yourName.length >10)
            errors.yourName= "First Name should be <= 10 characters";
        
         return errors;
        
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
         this.setState({
            [name]: value
        });
    }

    toggleModal(){
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleSubmit(event){
        this.toggleModal();
        alert('In handle submit\n values submitted is as folows \n dish id is: '+ this.props.dish.id +
        '\nRating is : '+this.state.ratingValue +'\nyour name is: '+this.state.yourName +'\nyour comment is: '+this.state.message);
        this.props.postComment(this.props.dish.id, this.state.ratingValue, this.state.yourName, this.state.message);
    
        event.preventDefault();
    }  
    handleBlur=(field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]:true}
        });
    }
    
        renderDish(dish) {
            if (dish != null)
                return(
                    <FadeTransform in 
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card>
                            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>

                            </CardBody>
                        </Card>
                    </FadeTransform>
                );
            else
                return(
                    <div></div>
                );
        }
        renderComments(comments, postComment, dishId){
            if(comments !=null){
                const dishC = comments.map((comments) => {
                    return (
                            <div  className="row" key={comments.id}>
                                
                                  <CardBody>
                                      <Fade in>
                                      <CardText>{comments.comment} </CardText>
                                      </Fade>
                                      <Fade in>
                                      <CardText>--{comments.author}, {new Intl.DateTimeFormat('en-US', 
                                          { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))} </CardText>
                                        </Fade>
                                  </CardBody>
                                  
                           </div>
                        
                        );
                    });
                return(dishC);

            }else 
             return(<div></div>);
        }
    
        render() {
            if (this.props.isLoading){
                 return(
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                 );
            }
            else if (this.props.errMess){
                    return(
                       <div className="container">
                           <div className="row">
                               <h4>{this.props.errMess}</h4>
                           </div>
                       </div>
                    );                
            }
            const errors = this.validate(this.state.yourName);
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                <div className="col-12">
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                </div>
                </div>        
                <div className="row">
                    
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        
                            <CardTitle>Comments</CardTitle>
                            <Stagger in>
                                {this.renderComments(this.props.comments, 
                                    this.props.postComment, this.props.dish.id)}
                            </Stagger>                        

                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-pencil fa-lg"> Comment</span>
                            </Button>  
                           
                    </div>
                    
                </div>
            
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
              <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                      <Label htmlFor="rating" className="col-12">Rating</Label>

                            <Col md={{size: 12}}>
                                <Input type="select" name="ratingValue" 
                                    value={this.state.ratingValue} 
                                    onChange={this.handleInputChange} >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>  
                            </Col>           
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="yourName" className="col-12">Your Name</Label>
                      <Col md={{size: 12}}>
                      <Input type="text" id="yourName" name="yourName" 
                                    value={this.state.yourName} 
                                    valid={errors.yourName ===''}
                                    invalid={errors.yourName !== ''}
                                    onBlur={this.handleBlur('yourName')}
                                    onChange={this.handleInputChange} />
                                     <FormFeedback>{errors.yourName}</FormFeedback>
                      </Col>
                  </FormGroup>
                  <FormGroup>
                        <Label htmlFor="message" md={12}>Comment</Label>
                            <Col md={12}>
                                <Input type="textarea" id="message" name="message" 
                                    rows="6"
                                    value={this.state.message} 
                                    onChange={this.handleInputChange} />
                            </Col>
                  </FormGroup>
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                  </Form>
          </ModalBody>
      </Modal>
      </div>
            );
    }

}


export default DishDetail;
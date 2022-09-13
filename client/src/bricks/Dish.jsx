import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import styles from "../css/dish.module.css";

function Dish(props){
    return (
        <Card className="bg-light">
            <Card.Header>
                <h5 className="card-title">{props.dish.name}</h5>
            </Card.Header>
            <Card.Body>
                <img className={`${styles.dishImg} img-fluid`} src={props.dish.imgUri} alt="" />
                <hr/>
                <p className="card-text">{props.dish.description}</p>
            </Card.Body>
            <Card.Footer> <span style={{fontWeight: "bold"}}>Dish ID: </span>{props.dish.id}</Card.Footer>
        </Card>
    );
}

export default Dish;
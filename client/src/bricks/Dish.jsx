import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import styles from "../css/dish.module.css";


function renderSmallCard(props){
    const dishDescTruncated = props.dish.description ? props.dish.description.substring(0, 50) : "No Description";
    console.log(props.dish);
    return (
        <Card className="bg-light">
            <Card.Header>
                <h5 className="card-title">{props.dish.name}</h5>
            </Card.Header>
            <Card.Body>
                <img className={`${styles.dishImg} img-fluid`} src={props.dish.imgUri} alt="" />
                <hr/>
                <p className="card-text">{dishDescTruncated}...</p>
                <ul>
                    {props.dish.ingredients.map((ingredient) => {
                        return <li>{ingredient.name} - {`${ingredient.amount} ${ingredient.unit}`}</li>
                    })}
                </ul>
            </Card.Body>
            <Card.Footer> <span style={{fontWeight: "bold"}}>Dish ID: </span>{props.dish.id}</Card.Footer>
        </Card>
    );
}

function renderBigCard(props){
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

function Dish(props){
    const cardDetail = props.detail || "big";
    return cardDetail === "big" ? renderBigCard(props) : renderSmallCard(props);
}

export default Dish;
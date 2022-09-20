import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import styles from "../css/dish.module.css";
import Icon from "@mdi/react";
import { mdiPencilOutline } from "@mdi/js";

function addIngredientNames(rIngredients, ingredientMap) {
  return rIngredients.map((el) => {
    return {
      id: el.id,
      amount: el.amount,
      unit: el.unit,
      name: ingredientMap[el.id],
    };
  });
}

function renderSmallCard(props) {
  const dishDescTruncated = props.dish.description
    ? props.dish.description.substring(0, 50)
    : "No Description";
  let mappedDishIngredients = addIngredientNames(
    props.dish.ingredients,
    props.ingredientList
  );
  return (
    <Card className="bg-light">
      <Card.Header>
        <h5 className="card-title">{props.dish.name}</h5>
      </Card.Header>
      <Card.Body>
        <img
          className={`${styles.dishImg} img-fluid`}
          src={props.dish.imgUri}
          alt=""
        />
        <hr />
        <p className="card-text">{dishDescTruncated}...</p>
        <ul>
          {mappedDishIngredients.map((ingredient) => {
            return (
              <li>
                {ingredient.name} - {`${ingredient.amount} ${ingredient.unit}`}
              </li>
            );
          })}
        </ul>
      </Card.Body>
      <Card.Footer>
        {" "}
        <span style={{ fontWeight: "bold" }}>Dish ID: </span>
        {props.dish.id}
      </Card.Footer>
    </Card>
  );
}

function renderBigCard(props) {
  return (
    <Card className="bg-light">
      <Card.Header>
        <h5 className="card-title">{props.dish.name}</h5>
      </Card.Header>
      <Card.Body>
        <img
          className={`${styles.dishImg} img-fluid`}
          src={props.dish.imgUri}
          alt=""
        />
        <hr />
        <p className="card-text">{props.dish.description}</p>
      </Card.Body>
      <Card.Footer style={{display: 'flex', justifyContent: 'flex-start'}}>
        <span style={{ fontWeight: "bold", marginRight: "0.25rem"}}>Dish ID: </span>
        {props.dish.id}
        <Icon 
            size={1} 
            path={mdiPencilOutline} 
            style={{ marginLeft: "auto", borderRadius: "5px", backgroundColor: "green", color: "white", cursor: "pointer" }} 
            onClick={() => props.onEdit(props.dish)} 
          />
      </Card.Footer>
    </Card>
  );
}

function Dish(props) {
  const cardDetail = props.detail || "big";
  return cardDetail === "big" ? renderBigCard(props) : renderSmallCard(props);
}

export default Dish;

import React from "react";
import Dish from "./Dish.jsx";
import styles from "../css/dish.module.css";

function DishRegularDetail(props) {
  function addIngredientNames(rIngredients, ingredientMap) {
    return rIngredients.map ((el)=>{
        return {
            id: el.id,
            amount: el.amount,
            unit: el.unit,
            name: ingredientMap[el.id]
        }
    })
  }

  function getDishList(dishList, ingredientList) {
    return (
      <div className={styles.dishWrapper}>
        {dishList.map((dish) => {
          let mappedDishData =
            props.detail === "small"
              ? addIngredientNames(dish.ingredients, ingredientList)
              : dish;
          return <Dish key={dish.id} dish={mappedDishData} detail={props.detail} />;
        })}
      </div>
    );
  }
  return getDishList(props.dishList, props.ingredientList);
}

export default DishRegularDetail;

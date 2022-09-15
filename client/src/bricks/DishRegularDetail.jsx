import React from "react";
import Dish from "./Dish.jsx";
import styles from "../css/dish.module.css";

function DishRegularDetail(props) {
  function parseIngredients(dishIngredients, allIngredients) {
    return allIngredients.filter((o1) =>
      dishIngredients.some((o2) => {
        return o1.id === o2.id ? o2['name'] = o1.name : "Unknown";
      })
    );
    
  }

  function getDishList(dishList, ingredientList) {
    return (
      <div className={styles.dishWrapper}>
        {dishList.map((dish) => {
          let ingredientNames =
            props.detail === "small"
              ? parseIngredients(dish.ingredients, ingredientList)
              : [];
        //   let dishWithIngredients = { ...dish, ingredientNames };
          console.log(dishWithIngredients);
          return <Dish key={dish.id} dish={dishWithIngredients} detail={props.detail} />;
        })}
      </div>
    );
  }
  return getDishList(props.dishList, props.ingredientList);
}

export default DishRegularDetail;

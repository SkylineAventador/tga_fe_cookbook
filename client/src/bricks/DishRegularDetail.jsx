import React from "react";
import Dish from "./Dish.jsx";
import styles from "../css/dish.module.css";

function DishRegularDetail(props) {
  function getDishList(dishList, ingredientList) {
    return (
      <div className={styles.dishWrapper}>
        {dishList.map((dish) => {
          return <Dish key={dish.id} dish={dish} ingredientList={ingredientList} detail={props.detail} />;
        })}
      </div>
    );
  }
  return getDishList(props.dishList, props.ingredientList);
}

export default DishRegularDetail;

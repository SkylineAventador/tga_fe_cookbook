import React from "react";
import Dish from "./Dish.jsx";
import styles from "../css/dish.module.css";

function DishList(props) {
    function getDishList(dishList) {
        return (<div className={styles.dishWrapper}>
            {dishList.map((dish) => {
                return <Dish key={dish.id} dish={dish} />
            })}
        </div>);
    }

    return getDishList(props.dishList);
}

export default DishList;
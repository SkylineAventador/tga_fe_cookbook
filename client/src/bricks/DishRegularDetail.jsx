import React from "react";
import Dish from "./Dish.jsx";
import styles from "../css/dish.module.css";

function DishRegularDetail(props) {
    function getDishList(dishList) {
        return (<div className={styles.dishWrapper}>
            {dishList.map((dish) => {
                return <Dish key={dish.id} dish={dish} detail={props.detail}/>
            })}
        </div>);
    }

    return getDishList(props.dishList);
}

export default DishRegularDetail;
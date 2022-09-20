import React from "react";
import Dish from "./Dish.jsx";

function DishRegularDetail(props) {
  function getDishList(dishList, ingredientList) {
    return (
      <div className="row">
        {dishList.map((dish) => {
          return (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
              style={{ paddingBottom: "16px" }}
              key={dish.id}
            >
              <Dish
                key={dish.id}
                dish={dish}
                ingredientList={ingredientList}
                detail={props.detail}
                onEdit={props.onEdit}
              />
            </div>
          );
        })}
      </div>
    );
  }
  return getDishList(props.dishList, props.ingredientList);
}

export default DishRegularDetail;

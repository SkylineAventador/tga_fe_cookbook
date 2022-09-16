import React from "react";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import styles from "../css/ingredient.module.css";

function IngredientList(props) {
  const [ingredientLoadCall, setIngredientLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch("http://localhost:3000/ingredient/list", {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setIngredientLoadCall({ state: "error", error: responseJson });
      } else {
        setIngredientLoadCall({
          state: "success",
          data: responseJson,
        });
        console.log(ingredientLoadCall.data);
      }
    });
  }, []);
  return (
    <div className={styles.ingredientCardsWrapper}>
      {console.log("Current state is: " + ingredientLoadCall.state)}
      {ingredientLoadCall.state === "success"
        ? ingredientLoadCall.data.map((ingredient) => {
            return <Card body border="dark">{ingredient.name}</Card>;
          })
        : "NO data available"}
    </div>
  );
}

export default IngredientList;

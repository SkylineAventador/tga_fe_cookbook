import React from "react";
import { useEffect, useState } from "react";

function prepareIngredientsMap(ingredients) {
  const result = {};

  ingredients.forEach((element) => {
    result[element.id] = element.name;
  });

  return result;
}

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
          data: prepareIngredientsMap(responseJson),
        });
      }
    });
  }, []);
  return (
    <div style={{ disply: "flex", flexDirection: "column" }}>
      {console.log("Current state is: " + ingredientLoadCall.state)}
      {ingredientLoadCall.state === "success"
        ? ingredientLoadCall.data.map((ingredient) => {
            return <p>{ingredient.name}</p>;
          })
        : "NO data available"}
    </div>
  );
}

export default IngredientList;

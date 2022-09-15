import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DishList from "./bricks/DishList.jsx";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "./css/recipe.module.css";

function App() {
  const [recipeLoadCall, setRecipeLoadCall] = useState({
    state: "pending",
  });

  const [ingredientLoadCall, setIngredientLoadCall] = useState({
    state: "pending",
  });

  function prepareIngredientsMap(ingredients) {
    const result = {};

    ingredients.forEach((element) => {
      result[element.id] = element.name;
    });

    return result;
  }

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

  useEffect(() => {
    fetch("http://localhost:3000/recipe/list", {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeLoadCall({ state: "error", error: responseJson });
      } else {
        setRecipeLoadCall({ state: "success", data: responseJson });
      }
    });
  }, []);

  function getChild() {
    const isPending =
      recipeLoadCall.state === "pending" ||
      ingredientLoadCall.state === "pending";
    const isSuccess =
      recipeLoadCall.state === "success" &&
      ingredientLoadCall.state === "success";
    const isError =
      recipeLoadCall.state === "error" || ingredientLoadCall.state === "error";

      console.log("CURRENT STATE IS: recipe:" + recipeLoadCall.state + " ingredients:" + ingredientLoadCall.state);
      console.log("Pending " + isPending + " Success " + isSuccess + " Error " + isError);

    if (isPending) {
      return (
        <div className={styles.loading}>
          <h1>
            Loading...{" "}
            <span style={{ fontSize: "24px", fontWeight: "lighter" }}>
              Please wait.
            </span>
          </h1>
          <Icon size={5} path={mdiLoading} spin={true} />
        </div>
      );
    } else if (isSuccess) {
      return (
        <DishList
          style={{ padding: "1rem" }}
          dishList={recipeLoadCall.data}
          ingredientList={ingredientLoadCall.data}
        />
      );
    } else if (isError) {
      return (
        <div className={styles.error}>
          <div>Error during recipes data loading.</div>
          <br />
          <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
        </div>
      );
    }
  }

  return <div className="App">{getChild()}</div>;
}

export default App;

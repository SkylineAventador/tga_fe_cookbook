import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "../css/recipe.module.css";
import DishList from "../bricks/DishList";

function prepareIngredientsMap(ingredients) {
  const result = {};

  ingredients.forEach((element) => {
    result[element.id] = element.name;
  });

  return result;
}

function RecipeList(props) {
  const [recipeLoadCall, setRecipeLoadCall] = useState({
    state: "pending",
  });

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
          rawData: responseJson,
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
          triggerRecipeDataUpdate={() => {
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
          }}
          ingredientList={ingredientLoadCall.data}
          rawIngredientList={ingredientLoadCall.rawData}
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
  return getChild();
}

export default RecipeList;

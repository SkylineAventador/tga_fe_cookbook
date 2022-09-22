import React, { useState, useMemo, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import {
  mdiTable,
  mdiViewGridOutline,
  mdiMagnify,
  mdiArrowCollapse,
  mdiArrowExpand,
} from "@mdi/js";

import DishTableList from "./DishTableDetail.jsx";
import DishRegularDetail from "./DishRegularDetail.jsx";
import RecipeCreationModal from "./RecipeCreationModal.jsx";
import UserContext from "../UserProvider.js";

function DishList(props) {
  const { setAuthorized, user } = useContext(UserContext);

  const [viewType, setViewType] = useState("grid");
  const [detailType, setDetailType] = useState("big");
  const isGrid = viewType === "grid";
  const isBig = detailType === "big";
  const [searchBy, setSearchBy] = useState("");

  const defaultRecipeShowState = {
    state: false,
  };

  const [createRecipeShow, setCreateRecipeShow] = useState(
    defaultRecipeShowState
  );
  const handleRecipeDataUpdate = () => {
    setCreateRecipeShow(defaultRecipeShowState);
    props.triggerRecipeDataUpdate();
  };
  const handleCreateRecipeShow = (data) =>
    setCreateRecipeShow({
      state: true,
      data,
    });

  const filteredDishList = useMemo(() => {
    return props.dishList.filter((item) => {
      return item.name
        .toLocaleLowerCase()
        .includes(searchBy.toLocaleLowerCase());
    });
  }, [searchBy, props.dishList]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) {
    if (!event.target.value) setSearchBy("");
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Dish List</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse style={{ justifyContent: "right" }}>
            <Form className="d-flex gap-1 flex-wrap" onSubmit={handleSearch}>
              {/* Recipe creation button here */}
              {/* Show modal only if user isAuthorized */}
              <Button
                variant="warning"
                onClick={()=>setAuthorized()}
              >
                {user.isAuthorized ? "Unauthorize user" : "Authorize user"}
              </Button>
              {user.isAuthorized && (
                <RecipeCreationModal
                  setCreateRecipeShow={() => {
                    handleRecipeDataUpdate();
                  }}
                  ingredientList={props.rawIngredientList}
                  editState={createRecipeShow}
                />
              )}
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
              <Button
                className={"d-none d-md-block"}
                variant="outline-primary"
                onClick={() =>
                  setViewType((currentState) => {
                    if (currentState === "grid") return "table";
                    else return "grid";
                  })
                }
              >
                <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                {isGrid ? "Table" : "Grid"}
              </Button>
              <Button
                variant="outline-primary"
                onClick={() =>
                  setDetailType((currentState) => {
                    if (currentState === "big") return "small";
                    else return "big";
                  })
                }
              >
                <Icon
                  size={1}
                  path={isBig ? mdiArrowCollapse : mdiArrowExpand}
                />{" "}
                {isBig ? "Small" : "Big"}
              </Button>
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div className={"d-block d-md-none"}>
        {isBig ? (
          <DishRegularDetail dishList={filteredDishList} detail="big" />
        ) : (
          <DishRegularDetail
            dishList={filteredDishList}
            ingredientList={props.ingredientList}
            detail="small"
          />
        )}
      </div>
      <div className="d-none d-md-block">
        {isGrid ? (
          isBig ? (
            <DishRegularDetail
              onEdit={(dish) => {
                handleCreateRecipeShow(dish);
              }}
              dishList={filteredDishList}
              detail="big"
            />
          ) : (
            <DishRegularDetail
              dishList={filteredDishList}
              ingredientList={props.ingredientList}
              detail="small"
            />
          )
        ) : (
          <DishTableList dishList={filteredDishList} />
        )}
      </div>
    </div>
  );
}

export default DishList;

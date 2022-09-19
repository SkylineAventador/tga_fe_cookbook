import Icon from "@mdi/react";
import { Modal, Button, Form } from "react-bootstrap";
import { mdiLoading, mdiPencilPlusOutline } from "@mdi/js";
import { useState } from "react";

function RecipeCreationModal(props) {
  const [validated, setValidated] = useState(false);
  const [isModalShown, setShow] = useState(false);
  const defaultForm = {
    name: "",
    description: "",
    ingredients: [],
  };
  const [formData, setFormData] = useState(defaultForm);
  const [recipeCreateCall, setRecipeCreateCall] = useState({
    state: "inactive",
  });

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  const emptyIngredient = () => {
    return { id: "", amount: 0, unit: "" };
  };

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  const setIngredientField = (inputName, val, index) => {
    return setFormData((formData) => {
      const newData = { ...formData };

      newData.ingredients[index][inputName] = val;
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ...formData,
    //   dishId: props.ingredientList.id,
    };

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    setRecipeCreateCall({ state: "pending" });

    const res = await fetch(`http://localhost:3000/recipe/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log("RES STATUS: " + res.status);
    console.log("RES DATA: " + data);
    if (res.status >= 400) {
      setRecipeCreateCall({ state: "error", error: data });
    } else {
      setRecipeCreateCall({ state: "success", data });
      handleCloseModal();

      //Refreshing form data to defauts
      setFormData(defaultForm);
    }
  };

  const addEmptyIngredient = () => {
    const newFormData = {
      ...formData,
      ingredients: [...formData.ingredients, emptyIngredient()],
    };
    setFormData(newFormData);
  };

  function removeIngredient(index) {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);

    const newFormData = {
      ...formData,
      ingredients: newIngredients,
    };
    setFormData(newFormData);
  }

  //Sorting obtained ingredients by Czech (default) alphabet.
  const sortedIngredientList = props.ingredientList.sort((a, b) => {
    return a.name.localeCompare(b.name, "cs");
  });

  // function to create new line of input group to add ingredient
  const ingredienceInputGroup = (ingredient, index) => {
    return (
      <div key={index} className={"d-flex justify-content-center gap-1"}>
        <Form.Group className="mb-1 w-75" controlId="ingredients">
          <Form.Label>Ingredient name</Form.Label>
          <Form.Select
            value={ingredient.id}
            onChange={(e) => setIngredientField("id", e.target.value, index)}
          >
            <option></option>
            {sortedIngredientList.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Enter valid ingredient name. Only letters and numbers are allowed.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1" controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={ingredient.amount}
            onChange={(e) =>
              setIngredientField("amount", parseInt(e.target.value), index)
            }
            min={1}
            max={20}
          />
          <Form.Control.Feedback type="invalid">
            Enter amount number corresponding to unit selected. Special symbols
            are not allowed.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1" controlId="unit">
          <Form.Label>Unit</Form.Label>
          <Form.Control
            value={ingredient.unit}
            onChange={(e) => setIngredientField("unit", e.target.value, index)}
          />
          <Form.Control.Feedback type="invalid">
            Enter unit symbol or shortage. Numbers are not allowed.
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          style={{
            height: "50%",
            backgroundColor: "#E23D28",
            marginTop: "auto",
            marginBottom: ".25rem",
          }}
          onClick={() => removeIngredient(index)}
        >
          X
        </Button>
      </div>
    );
  };

  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Recipe Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            id="rc_form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Form.Group controlId="recipeName">
              <Form.Label>Recipe name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recipe name here"
                required
              />
              <Form.Control.Feedback type="invalid">
                You have to fill this field in order to continue.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="recipeDescription">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                //Preventing input filed become too high, in case of need, there is a scroll bar.
                style={{ maxHeight: "256px" }}
                as="textarea"
                placeholder="Enter recipe instructions here. Max 1000 symbols"
                maxLength={1000}
              />

              <Form.Control.Feedback type="invalid">
                Enter description with maximum of 1000 symbols.
              </Form.Control.Feedback>
            </Form.Group>

            {formData.ingredients.map((ing, index) => {
              return ingredienceInputGroup(ing, index);
            })}

            <Button style={{ marginTop: "1rem" }} onClick={addEmptyIngredient}>
              Add
            </Button>

            <div className={"d-flex justify-content-between mt-5"}>
              {/* show an error in case of a problem during POST request to the server */}
              {recipeCreateCall.state === "error" && (
                <div className="text-danger">
                  Ingredient error: {recipeCreateCall.error.errorMessage}
                </div>
              )}

              <Button
                variant="danger"
                size="md"
                className="w-25"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                variant="success"
                type="submit"
                size="md"
                className="w-25"
                disabled={recipeCreateCall.state === "pending"}
              >
                {recipeCreateCall.state === "pending" ? (
                  <Icon size={0.8} path={mdiLoading} spin={true} />
                ) : (
                  "Create recipe"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Button variant="outline-success" onClick={handleShowModal}>
        <Icon path={mdiPencilPlusOutline} size={1} />
        Create dish
      </Button>
    </>
  );
}

export default RecipeCreationModal;

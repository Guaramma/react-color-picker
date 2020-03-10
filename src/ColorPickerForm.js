import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {
  render() {
    const {
      currentColor,
      handleColorChange,
      addNewColor,
      newName,
      handleNameChange,
      paletteIsFull,
      classes
    } = this.props;
    return (
      <div>
        <ChromePicker
          className={classes.picker}
          color={currentColor}
          onChange={handleColorChange}
        />

        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            className={classes.colorNameInput}
            value={newName}
            placeholder="Color Name"
            margin="normal"
            variant="filled"
            onChange={handleNameChange}
            validators={["required", "isColorUnique", "isColorNameUnique"]}
            errorMessages={[
              "Enter a color name",
              "Color already used",
              "Color name must be unique"
            ]}
          />
          <Button
            className={classes.addColor}
            variant="contained"
            color="primary"
            style={{ background: paletteIsFull ? "grey" : currentColor }}
            type="submit"
            disabled={paletteIsFull}
          >
            {paletteIsFull ? "Palette Full" : "ADD COLOR"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);

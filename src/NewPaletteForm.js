import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ValidatorForm } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import arrayMove from "array-move";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPaletteFormStyles";

const useStyles = makeStyles(styles);

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const maxColors = 20;
  const [open, setOpen] = React.useState(false);
  const [currentColor, setColor] = React.useState("#008080");
  const [colors, newColors] = React.useState(props.palettes[0].colors);
  const [newName, setNewName] = React.useState([]);
  const [newPaletteName, setNewPaletteName] = React.useState("");

  const paletteIsFull = colors.length >= maxColors;

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule("isColorUnique", value =>
      colors.every(({ color }) => color !== currentColor)
    );

    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleColorChange = color => {
    setColor(color.hex);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = () => {
    const Color = { color: currentColor, name: newName };
    newColors([...colors, Color]);
    setNewName("");
  };

  const handleNameChange = evt => {
    setNewName(evt.target.value);
  };

  const handleChange = evt => {
    setNewPaletteName(evt.target.value);
  };

  const handleSubmit = newPalette => {
    console.log(newPalette);
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const removeColor = colorName => {
    newColors(colors.filter(color => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    newColors(arrayMove(colors, oldIndex, newIndex));
  };

  const clearColors = () => {
    newColors([]);
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[rand];

    if (colors.length === 0) {
      newColors([...colors, randomColor]);
    }
    for (let i in colors) {
      if (colors[i].name === randomColor.name) {
        return addRandomColor();
      } else if (colors[i].name !== randomColor.name) {
        newColors([...colors, randomColor]);
      }
    }
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newPaletteName={newPaletteName}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <div></div>
            <Button
              className={classes.button}
              onClick={clearColors}
              variant="contained"
              color="secondary"
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              disabled={paletteIsFull}
              onClick={addRandomColor}
              variant="contained"
              color="primary"
            >
              Random Color
            </Button>
          </div>

          <ColorPickerForm
            currentColor={currentColor}
            handleColorChange={handleColorChange}
            addNewColor={addNewColor}
            newName={newName}
            handleNameChange={handleNameChange}
            paletteIsFull={paletteIsFull}
          />
        </div>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          axis="xy"
          colors={colors}
          removeColor={removeColor}
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

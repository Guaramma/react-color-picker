import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/MiniPaletteList";
import DelteIcon from "@material-ui/icons/Delete";

function MiniPalette(props) {
  const {
    classes,
    paletteName,
    emoji,
    colors,
    handelClick,
    handleDelete,
    id
  } = props;
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ background: color.color }}
      key={color.name}
    />
  ));

  const deletePalette = e => {
    e.stopPropagation();
    handleDelete(id);
  };

  return (
    <div className={classes.root} onClick={handelClick}>
      <DelteIcon onClick={deletePalette} className={classes.deleteIcon} />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}
export default withStyles(styles)(MiniPalette);

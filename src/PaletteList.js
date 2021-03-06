import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export class PaletList extends Component {
  goToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };

  render() {
    const { palettes, classes, deletePalette } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create Palet</Link>
          </nav>
          <TransitionGroup className={classes.palette}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} timeout={500} classNames="fade">
                <MiniPalette
                  {...palette}
                  key={palette.id}
                  handleDelete={deletePalette}
                  handelClick={() => this.goToPalette(palette.id)}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletList);

import React, { Component } from 'react';
import LanguageContext from '../contexts/LanguageContext';
import ColorContext from "../contexts/ColorContext";

export class Button extends Component {
  renderButton(color) {
    return(
      <button className={`ui button ${color}`}>
        <LanguageContext>
          {(value) => value === 'english' ? 'Submit' : 'Voorleggen'}
        </LanguageContext>
      </button>
    )
  }

  render() {
    return (
      <ColorContext.Consumer>
        {(color) => this.renderButton(color)}
      </ColorContext.Consumer>

    )
  }
}
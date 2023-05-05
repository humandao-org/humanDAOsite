import React from "react";
import { storyblokEditable } from "@storyblok/react";
import { render } from 'storyblok-rich-text-react-renderer';

class TeachingModuleText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  moveToNextElement = () => {
    this.setState({ visibleIndex: this.state.visibleIndex + 1 }) 
  }

  render() {
    return (
      <div {...storyblokEditable(this.props.blok)}>
        <h2 className="font-bungee font-bold mt-2 text-center md:text-left">{this.props.blok.headline}</h2>
        <div className="rte-styles pt-4 pb-8">{render(this.props.blok.text)}</div>
      </div>
    )
  }
}

export default TeachingModuleText


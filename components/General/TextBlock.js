import React from "react";
import { storyblokEditable } from "@storyblok/react";
import { render, NODE_UL, NODE_LI } from 'storyblok-rich-text-react-renderer';
import styles from "/styles/TextBlock.module.css"

/*
const MySchema = require('storyblok-js-client/dist/schema')

MySchema.nodes.list_item = function(node) {
  let attrs = {}

  if (node.content &&
      node.content.length === 1 &&
      node.content[0].type === 'paragraph') {
    let content = node.content[0].content
    node.content = content
  }

  return {
    tag: 'li'
  }
}
*/

/*
function TextBlock(props) {
  // document is the rich text object you receive from Storyblok,
  // in the form { type: "doc", content: [ ... ] }
  return <div>{render(props.blok.text, {
    nodeResolvers: {
      [NODE_LI]: (children, props) => { console.log(children); return (<li {...props}>{children[0].props.children}</li>) }
    }    
  })}</div>;
}
*/

class TextBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let Heading = 'h' + this.props.blok.importance || "h2"
    return (
      <div {...storyblokEditable(this.props.blok)} 
        style={{...(this.props.blok.grid_column && { gridColumn: this.props.blok.grid_column })}}
        className={`${this.props.blok.max_widths || ''} text-${this.props.blok.text_align || 'left'}`}>
        { this.props.blok.headline && 
          (<Heading className={`font-bold ${this.props.blok.size_header ? 'text-' + this.props.blok.size_header : ''} ${this.props.blok.header_margins || ''}`} style={{color: this.props.blok.header_color || 'black' }}>{this.props.blok.headline}</Heading>)
        }
        <div 
          className={`rte-styles ${styles.narrow_solve} ${this.props.blok.text_paddings || ''} text-${this.props.blok.size_text || 'base'}`} style={{color: this.props.blok.text_color || 'black' }}
        >
          {render(this.props.blok.text)}
        </div>
      </div>
    )
  }
}

export default TextBlock

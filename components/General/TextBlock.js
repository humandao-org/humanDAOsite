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
    let Heading = "h2" // Use For other headers just use the ability of the text block to create headers
    return (
      <div {...storyblokEditable(this.props.blok)} className={this.props.blok.align ? `text-` + this.props.blok.align : ''}>
        { this.props.blok.headline ? (<Heading className={`this.props.blok.size_header ? text-${this.props.blok.size_header} : ''`}>{this.props.blok.headline}</Heading>) : null }
        <div className={`${styles.narrow_solve} pt-${this.props.blok.padding || '0'} text-${this.props.blok.size_text || 'base'}`}>{render(this.props.blok.text)}</div>
      </div>
    )
  }
}

export default TextBlock


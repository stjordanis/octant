import NodeShape = cytoscape.Css.NodeShape;
import { Stylesheet } from 'cytoscape';

export const ELEMENTS_STYLE: Stylesheet[] = [
  {
    selector: 'node',
    css: {
      shape: node => nodeShape(node),
      width: 'data(width)',
      height: 'data(height)',
      content: 'data(label)',
      'background-color': '#F2F2F2',
      color: 'black',
      'border-color': 'black',
      'border-width': '2px',
      'border-style': 'solid',
      'font-size': 14,
      ghost: 'no',
      'text-wrap': 'wrap',
      'text-valign': 'top',
      'text-halign': 'center',
      'text-margin-y': 30,
      'padding-left': '10px',
      'padding-right': '10px',
      'padding-top': '10px',
      'padding-bottom': '10px',
      'z-index': 1,
    },
  },

  {
    selector: 'node:selected',
    css: {
      'curve-style': 'bezier',
      'border-width': 1,
      'border-color': '#313131',
      'border-style': 'solid',
    },
  },
  {
    selector: 'edge',
    css: {
      'curve-style': 'bezier',
      opacity: 1,
      width: 1.5,
      'line-color': 'black',
      'source-arrow-color': 'black',
      'source-arrow-fill': 'hollow',
      'source-arrow-shape': 'tee',
      'target-arrow-color': 'black',
      'target-arrow-fill': 'hollow',
      'target-arrow-shape': 'triangle-backcurve',
      'arrow-scale': 2,
      // @ts-ignore: cytoscape type definitions are out of date
      'z-compound-depth': 'top',
    },
  },
  {
    selector: '.unbundled',
    css: {
      'curve-style': 'unbundled-bezier',
      // @ts-ignore: cytoscape type definitions are out of date
      'source-endpoint': '90deg',
      // @ts-ignore: cytoscape type definitions are out of date
      'target-endpoint': '270deg',
    },
  },
  {
    selector: '.pod',
    css: {
      ghost: 'yes',
      'ghost-opacity': 1,
      'ghost-offset-x': 10,
      'ghost-offset-y': 10,
      'font-size': 18,
      'text-margin-y': 42,
      'border-width': 1.5,
      'z-index': 3,
    },
  },
  {
    selector: '.deployment',
    css: {
      'font-size': 24,
      'text-margin-y': 58,
    },
  },
  {
    selector: '.secret',
    css: {
      'font-size': 18,
      'text-margin-y': 42,
    },
  },
  {
    selector: '.replicaset',
    css: {
      'font-size': 24,
      'text-margin-y': 56,
      'border-style': 'dashed',
      'border-width': 3,
      'z-index': 2,
    },
  },
  {
    selector: '.label',
    css: {
      'background-color': '#13C6CE',
      'border-width': '0px',
      'z-index': 10,
    },
  },
  {
    selector: '.port',
    css: {
      'border-width': '0px',
      'z-index': 10,
    },
  },
  {
    selector: '.selector',
    css: {
      'background-color': '#F9C011',
      'border-width': '0px',
      'z-index': 10,
    },
  },
  {
    selector: '[owner]',
    css: {
      // @ts-ignore: cytoscape type definitions are out of date
      visibility: 'hidden',
    },
  },
];

function nodeShape(node): NodeShape {
  return node.data('shape');
}

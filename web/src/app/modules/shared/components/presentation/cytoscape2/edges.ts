import {BaseShape} from "./base.shape";

export class Edge extends BaseShape {

  constructor( id: string,
               public sourceId: string,
               public targetId: string,
               public classes?: string ) {
    super(id, 'Edge');
  }

  toNode(shapes: BaseShape[]) {
    return {
      data: {
        id: this.id,
        source: this.sourceId,
        target: this.targetId,
      },
      group: 'edges',
      removed: false,
      selected: false,
      selectable: true,
      locked: false,
      grabbable: true,
      pannable: false,
      classes: this.classes
    }
  }

}

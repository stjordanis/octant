import { BaseShape } from './base.shape';

export abstract class Shape extends BaseShape {
  protected constructor(
    id: string,
    kind: string,
    public label: string,
    public width: any,
    public height: any,
    public shape: string,
    public hasChildren: boolean,
    public parentId?: string
  ) {
    super(id, kind);
  }
  x: number;
  y: number;
  classes: string;

  element: any;

  ports: Shape[] = [];

  abstract preferredPosition(): { x: number; y: number };

  nextPortPosition(shapes: BaseShape[], port: Port, prefered: number): number {
    if (this.ports.length === 0) {
      this.ports.push(port);
      return prefered;
    }

    if (this.ports.includes(port)) {
      return port.y;
    }

    const total = this.ports.filter(
      (shape: Port) =>
        shape.parentId === this.id && shape.location === port.location
    ).length;
    this.ports.push(port);
    return total > 0 ? prefered + this.height / 3 : prefered;
  }

  preferredPortPosition(shapes: BaseShape[]): number {
    return this.preferredPosition().y - this.height / 6;
  }

  getPosition(shapes: BaseShape[]): { x: number; y: number } {
    return this.preferredPosition();
  }

  getPortPosition(shapes: Shape[], port: Port): { x: number; y: number } {
    const textWidth = this.getTextWidth(port.label) + 10;
    const { x, y } = this.getPosition(shapes);
    const portY = this.nextPortPosition(
      shapes,
      port,
      this.preferredPortPosition(shapes)
    );

    switch (port.location) {
      default:
      case 'left':
        return { x: x - this.width / 2 + textWidth / 2, y: portY };
      case 'right':
        return { x: x + this.width / 2 - textWidth / 2, y: portY };
    }
  }

  isMovable(): boolean {
    return this.parentId === undefined;
  }

  getTextWidth(txt) {
    const fontName = 'Metropolis';
    const fontSize = 14;
    //    this.cytoscape.nodes('#glyph20')[0]._private.rstyle.labelWidth

    if (!this.element) {
      this.element = document.createElement('span');
      document.body.appendChild(this.element);
    }
    if (this.element.style.fontSize !== fontSize) {
      this.element.style.fontSize = fontSize;
    }
    if (this.element.style.fontFamily !== fontName) {
      this.element.style.fontFamily = fontName;
    }
    this.element.innerText = txt;
    return this.element.offsetWidth;
  }

  toNode(shapes: BaseShape[]) {
    return {
      data: {
        id: this.id,
        label: this.label,
        owner: this.parentId,
        width: this.width,
        height: this.height,
        x: this.getPosition(shapes).x,
        y: this.getPosition(shapes).y,
        hasChildren: this.hasChildren,
        shape: this.shape,
      },
      group: 'nodes',
      removed: false,
      selected: false,
      selectable: this.isMovable(),
      locked: false,
      grabbable: this.isMovable(),
      pannable: false,
      classes: this.classes,
    };
  }
}

export class Deployment extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'Deployment',
      label,
      800,
      600,
      'rectangle',
      hasChildren,
      parentId
    );
    this.classes = 'deployment';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 750, y: 450 };
  }

  preferredPortPosition(shapes: BaseShape[]): number {
    return this.preferredPosition().y / 2;
  }
}

export class DaemonSet extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'DaemonSet',
      label,
      600,
      450,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'deployment';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 850, y: 500 };
  }
}

export class StatefulSet extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'StatefulSet',
      label,
      600,
      450,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'deployment';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 850, y: 500 };
  }
}

export class Secret extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'Secret',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 100, y: 1000 };
  }
}

export class ServiceAccount extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'ServiceAccount',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 600, y: 1000 };
  }
}

export class Service extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'Service',
      label,
      350,
      200,
      'roundrectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 0, y: 400 };
  }
}

export class ConfigMap extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(id, 'ConfigMap', label, 350, 200, 'rectangle', hasChildren, parentId);
    this.classes = 'secret';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 1100, y: 1000 };
  }
}

export class Node extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(id, 'Node', label, 350, 200, 'rectangle', hasChildren, parentId);
    this.classes = 'secret';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class Namespace extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(id, 'Namespace', label, 350, 200, 'rectangle', hasChildren, parentId);
    this.classes = 'secret';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class Event extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(id, 'Event', label, 350, 200, 'rectangle', hasChildren, parentId);
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class ClusterRole extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'ClusterRole',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class ClusterRoleBinding extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'ClusterRoleBinding',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class CRD extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'CustomResourceDefinition',
      label,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class Unknown extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'Unknown',
      `Unknown resource: ${label}`,
      350,
      200,
      'rectangle',
      hasChildren,
      parentId
    );
    this.classes = 'secret';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 0, y: 0 };
  }
}

export class ReplicaSet extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(
      id,
      'ReplicaSet',
      label,
      600,
      400,
      'rectangle',
      hasChildren,
      parentId
    );
    this.classes = 'replicaset';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 800, y: 500 };
  }
}

export class Pod extends Shape {
  constructor(
    id: string,
    label: string,
    hasChildren: boolean,
    parentId?: string
  ) {
    super(id, 'Pod', label, 350, 200, 'roundrectangle', hasChildren, parentId);
    this.classes = 'pod';
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 875, y: 525 };
  }
}

export class Port extends Shape {
  constructor(
    id: string,
    label: string,
    public location: string,
    className: string,
    parentId?: string
  ) {
    super(id, 'Port', label, 'label', 'label', 'rectangle', false, parentId);
    this.classes = className;
  }

  isMovable(): boolean {
    return false;
  }

  preferredPosition(): { x: number; y: number } {
    return { x: 750, y: 450 };
  }

  getPosition(shapes: Shape[]): { x: number; y: number } {
    const parentNode: Shape = shapes.find(
      (shape: Shape) => shape.id === this.parentId
    );
    const portPosition = parentNode.getPortPosition(shapes, this);
    this.x = portPosition.x;
    this.y = portPosition.y;

    return portPosition;
  }
}

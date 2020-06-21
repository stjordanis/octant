
export abstract class BaseShape {
  protected constructor(public id: string, public kind: string) {
  }

  toNode(shapes: BaseShape[]) {}
}

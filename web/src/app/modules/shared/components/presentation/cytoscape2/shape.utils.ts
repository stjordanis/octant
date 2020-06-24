import { BaseShape } from './base.shape';
import {
  ClusterRole,
  ClusterRoleBinding,
  ConfigMap,
  CRD,
  DaemonSet,
  Deployment,
  Event,
  Namespace,
  Node,
  Pod,
  ReplicaSet,
  Secret,
  Service,
  ServiceAccount,
  StatefulSet,
  Unknown,
} from './shapes';

export abstract class ShapeUtils {
  static fromDataStream(id: string, data: any): BaseShape {
    switch (data.kind) {
      case 'Service':
        return new Service(id, ShapeUtils.getLabel(data), false);
      case 'ReplicaSet':
        return new ReplicaSet(id, ShapeUtils.getLabel(data), false);
      case 'ServiceAccount':
        return new ServiceAccount(id, ShapeUtils.getLabel(data), false);
      case 'Secret':
        return new Secret(id, ShapeUtils.getLabel(data), false);
      case 'Pod':
        return new Pod(id, ShapeUtils.getLabel(data), false);
      case 'Deployment':
        return new Deployment(id, ShapeUtils.getLabel(data), false);
      case 'ConfigMap':
        return new ConfigMap(id, ShapeUtils.getLabel(data), false);
      case 'DaemonSet':
        return new DaemonSet(id, ShapeUtils.getLabel(data), false);
      case 'StatefulSet':
        return new StatefulSet(id, ShapeUtils.getLabel(data), false);
      case 'Node':
        return new Node(id, ShapeUtils.getLabel(data), false);
      case 'Namespace':
        return new Namespace(id, ShapeUtils.getLabel(data), false);
      case 'Event':
        return new Event(id, ShapeUtils.getLabel(data), false);
      case 'ClusterRole':
        return new ClusterRole(id, ShapeUtils.getLabel(data), false);
      case 'ClusterRoleBinding':
        return new ClusterRoleBinding(id, ShapeUtils.getLabel(data), false);
      case 'CustomResourceDefinition':
        return new CRD(id, ShapeUtils.getLabel(data), false);
      default:
        return new Unknown(id, data.kind, false);
    }
  }

  static getLabel(data: any): string {
    return data.name + '\n' + data.apiVersion + ' ' + data.kind;
  }

  static findByKind(shapes: BaseShape[], kind: string): BaseShape[] {
    return shapes.filter(shape => shape && shape.kind === kind);
  }

  static findById(shapes: BaseShape[], id: string): BaseShape[] {
    return shapes.filter(shape => shape && shape.id === id);
  }

  static shapeOrder(kind: string): number {
    switch (kind) {
      case 'Deployment':
      case 'DaemonSet':
      case 'StatefulSet':
        return 1;
      case 'ReplicaSet':
        return 2;
      case 'Edge':
        return 4;
      default:
        return 3;
    }
  }
}

import {Shape} from "../app/modules/shared/components/presentation/cytoscape2/shapes";
import {BaseShape} from "../app/modules/shared/components/presentation/cytoscape2/base.shape";
import {Edge} from "../app/modules/shared/components/presentation/cytoscape2/edges";

type BackendEdgeDef= {
  node: string,
  edge: string,
}

export type BackendEdgesDef= Record< string, BackendEdgeDef[]>

// this is temporary location for helpers until this functionality is done on backend
export function establishRelations(shapes: BaseShape[]): BaseShape[] {
  shapes.forEach((shape: Shape) => {
    switch (shape.kind) {
      case 'ReplicaSet':
        shape.hasChildren = true;
        const pod: Shape= Shape.findByKind(shapes, 'Pod')[0] as Shape;
        pod.parentId = shape.id;
        break;
      case 'Deployment':
        shape.hasChildren = true;
        const replica: Shape= Shape.findByKind(shapes, 'ReplicaSet')[0] as Shape;
        replica.parentId = shape.id;
        break;
      default:
        break;
    }
  });
  return shapes;
}

export function createEdges(shapes: BaseShape[], edges: BackendEdgesDef) {
  Object.entries(edges).map(([key, value]) => {
    value.forEach(val => {
      const sourceShape: Shape= Shape.findById(shapes as Shape[], key)[0];
      const targetShape: Shape= Shape.findById(shapes as Shape[], val.node)[0];
      let add= true;

      if(sourceShape.kind === 'ReplicaSet' && targetShape.kind === 'Deployment' )
        add= false;
      if(sourceShape.kind === 'Pod' && targetShape.kind === 'ReplicaSet' )
        add= false;
      if(sourceShape.kind === 'Pod' && targetShape.kind === 'Secret' )
        key = Shape.findByKind(shapes,"ServiceAccount")[0].id;
      if(sourceShape.kind === 'ReplicaSet' && targetShape.kind === 'Pod' )
        add= false;

      if(add) {
        shapes.push(new Edge(`${key}-${val.node}`, val.node, key))
      }
    })
  });
}

export const REAL_DATA =
  {
  "edges": {
  "70078b2d-8872-4986-9e29-6219b0555aa1": [
    {
      "node": "fa5f6908-f026-49a2-9cdd-d326531a98af",
      "edge": "explicit"
    }
  ],
    "elasticsearch-dbf4fc4df pods": [
    {
      "node": "0b830062-898a-4804-9b2a-2175346a3fd1",
      "edge": "explicit"
    },
    {
      "node": "70078b2d-8872-4986-9e29-6219b0555aa1",
      "edge": "explicit"
    },
    {
      "node": "70322572-73a3-4d6a-bc33-3de67655e183",
      "edge": "explicit"
    },
    {
      "node": "7ef1a36e-2d5d-4b0e-96e9-85b96f300ac2",
      "edge": "explicit"
    }
  ]
},
  "nodes": {
  "fa5f6908-f026-49a2-9cdd-d326531a98af": {
      "name": "elasticsearch",
      "apiVersion": "apps/v1",
      "kind": "Deployment",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "Deployment is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "elasticsearch",
          "ref": "/overview/namespace/jobs-demo/workloads/deployments/elasticsearch"
        }
      }
    },
  "7ef1a36e-2d5d-4b0e-96e9-85b96f300ac2": {
      "name": "default-token-hngkn",
      "apiVersion": "v1",
      "kind": "Secret",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "v1 Secret is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "default-token-hngkn",
          "ref": "/overview/namespace/jobs-demo/config-and-storage/secrets/default-token-hngkn"
        }
      }
    },
  "70322572-73a3-4d6a-bc33-3de67655e183": {
      "name": "default",
      "apiVersion": "v1",
      "kind": "ServiceAccount",
      "status": "ok",
      "details": [
        {
          "metadata": {
            "type": "text"
          },
          "config": {
            "value": "v1 ServiceAccount is OK"
          }
        }
      ],
      "path": {
        "metadata": {
          "type": "link",
          "title": [
            {
              "metadata": {
                "type": "text"
              },
              "config": {
                "value": ""
              }
            }
          ]
        },
        "config": {
          "value": "default",
          "ref": "/overview/namespace/jobs-demo/config-and-storage/service-accounts/default"
        }
      }
    },
  "0b830062-898a-4804-9b2a-2175346a3fd1": {
    "name": "elasticsearch",
      "apiVersion": "v1",
      "kind": "Service",
      "status": "ok",
      "details": [
      {
        "metadata": {
          "type": "text"
        },
        "config": {
          "value": "Service is OK"
        }
      }
    ],
      "path": {
      "metadata": {
        "type": "link",
          "title": [
          {
            "metadata": {
              "type": "text"
            },
            "config": {
              "value": ""
            }
          }
        ]
      },
      "config": {
        "value": "elasticsearch",
          "ref": "/overview/namespace/jobs-demo/discovery-and-load-balancing/services/elasticsearch"
      }
    }
  },
  "70078b2d-8872-4986-9e29-6219b0555aa1": {
    "name": "elasticsearch-dbf4fc4df",
      "apiVersion": "apps/v1",
      "kind": "ReplicaSet",
      "status": "ok",
      "details": [
      {
        "metadata": {
          "type": "text"
        },
        "config": {
          "value": "Replica Set is OK"
        }
      }
    ],
      "path": {
      "metadata": {
        "type": "link",
          "title": [
          {
            "metadata": {
              "type": "text"
            },
            "config": {
              "value": ""
            }
          }
        ]
      },
      "config": {
        "value": "elasticsearch-dbf4fc4df",
          "ref": "/overview/namespace/jobs-demo/workloads/replica-sets/elasticsearch-dbf4fc4df"
      }
    }
  },
  "elasticsearch-dbf4fc4df pods": {
    "name": "elasticsearch-dbf4fc4df pods",
      "apiVersion": "v1",
      "kind": "Pod",
      "status": "ok",
      "details": [
      {
        "metadata": {
          "type": "podStatus"
        },
        "config": {
          "pods": {
            "elasticsearch-dbf4fc4df-x5k79": {
              "details": [
                {
                  "metadata": {
                    "type": "text"
                  },
                  "config": {
                    "value": ""
                  }
                }
              ],
              "status": "ok"
            }
          }
        }
      }
    ]
  },
}
  }

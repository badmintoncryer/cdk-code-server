# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### CodeServer <a name="CodeServer" id="cdk-code-server.CodeServer"></a>

#### Initializers <a name="Initializers" id="cdk-code-server.CodeServer.Initializer"></a>

```typescript
import { CodeServer } from 'cdk-code-server'

new CodeServer(scope: Construct, id: string, props?: CodeServerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-code-server.CodeServer.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-code-server.CodeServer.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-code-server.CodeServer.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-code-server.CodeServerProps">CodeServerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-code-server.CodeServer.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-code-server.CodeServer.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk-code-server.CodeServer.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-code-server.CodeServerProps">CodeServerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-code-server.CodeServer.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-code-server.CodeServer.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-code-server.CodeServer.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-code-server.CodeServer.isConstruct"></a>

```typescript
import { CodeServer } from 'cdk-code-server'

CodeServer.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-code-server.CodeServer.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-code-server.CodeServer.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-code-server.CodeServer.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### CodeServerProps <a name="CodeServerProps" id="cdk-code-server.CodeServerProps"></a>

#### Initializer <a name="Initializer" id="cdk-code-server.CodeServerProps.Initializer"></a>

```typescript
import { CodeServerProps } from 'cdk-code-server'

const codeServerProps: CodeServerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-code-server.CodeServerProps.property.cpuType">cpuType</a></code> | <code>aws-cdk-lib.aws_ec2.AmazonLinuxCpuType</code> | *No description.* |
| <code><a href="#cdk-code-server.CodeServerProps.property.instanceType">instanceType</a></code> | <code>aws-cdk-lib.aws_ec2.InstanceType</code> | *No description.* |
| <code><a href="#cdk-code-server.CodeServerProps.property.policy">policy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement</code> | *No description.* |
| <code><a href="#cdk-code-server.CodeServerProps.property.volumeSize">volumeSize</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-code-server.CodeServerProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | *No description.* |

---

##### `cpuType`<sup>Optional</sup> <a name="cpuType" id="cdk-code-server.CodeServerProps.property.cpuType"></a>

```typescript
public readonly cpuType: AmazonLinuxCpuType;
```

- *Type:* aws-cdk-lib.aws_ec2.AmazonLinuxCpuType

---

##### `instanceType`<sup>Optional</sup> <a name="instanceType" id="cdk-code-server.CodeServerProps.property.instanceType"></a>

```typescript
public readonly instanceType: InstanceType;
```

- *Type:* aws-cdk-lib.aws_ec2.InstanceType

---

##### `policy`<sup>Optional</sup> <a name="policy" id="cdk-code-server.CodeServerProps.property.policy"></a>

```typescript
public readonly policy: PolicyStatement;
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `volumeSize`<sup>Optional</sup> <a name="volumeSize" id="cdk-code-server.CodeServerProps.property.volumeSize"></a>

```typescript
public readonly volumeSize: number;
```

- *Type:* number

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="cdk-code-server.CodeServerProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

---




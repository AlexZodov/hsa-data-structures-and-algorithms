import { isDefined } from 'class-validator';

class Node {
  public value: any;
  public left: Node;
  public right: Node;
  public height: number;
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = null;
  }

  async erase(): Promise<void> {
    if (isDefined(this.value)) {
      this.value = undefined;
      this.height = null;
    }
    if (isDefined(this.left)) {
      await this.left.erase();
    }
    if (isDefined(this.right)) {
      await this.right.erase();
    }
  }
}

export class BalancedBSTEntity {
  private root: Node;
  constructor() {
    this.root = null;
  }

  async insert(data): Promise<void> {
    // it was done intentionally
    for (let i = 0; i < data.length - 1; i++) {
      if (!this.root) {
        this.root = new Node(data[i]);
        return;
      }

      await this.insertNode(this.root, data[i]);
    }
  }

  async checkBalance(node): Promise<any> {
    if (!node) {
      return null;
    }

    const balanceFactor = node.left
      ? node.left.height
      : 0 - (node.right ? node.right.height : 0);

    if (balanceFactor > 1) {
      if (node.left.left && node.left.left.height > node.left.right.height) {
        // Right rotation
        return this.rightRotate(node);
      } else {
        // Left-right rotation
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
    } else if (balanceFactor < -1) {
      if (
        node.right.right &&
        node.right.right.height > node.right.left.height
      ) {
        // Left rotation
        return this.leftRotate(node);
      } else {
        // Right-left rotation
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
    }

    return node;
  }

  async rightRotate(node): Promise<Node> {
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;

    node.height =
      1 +
      Math.max(
        node.left ? node.left.height : 0,
        node.right ? node.right.height : 0,
      );
    temp.height =
      1 +
      Math.max(
        temp.left ? temp.left.height : 0,
        temp.right ? temp.right.height : 0,
      );

    return temp;
  }

  async leftRotate(node): Promise<Node> {
    const temp = node.right;
    node.right = temp.left;
    temp.left = node;

    node.height =
      1 +
      Math.max(
        node.left ? node.left.height : 0,
        node.right ? node.right.height : 0,
      );
    temp.height =
      1 +
      Math.max(
        temp.left ? temp.left.height : 0,
        temp.right ? temp.right.height : 0,
      );

    return temp;
  }

  async find(value): Promise<Node> {
    let current = this.root;

    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return current;
      }
    }

    return null;
  }

  async delete(value): Promise<void> {
    this.root = await this.deleteNode(this.root, value);
  }

  async findMin(node): Promise<Node> {
    if (!node.left) {
      return node;
    }

    return this.findMin(node.left);
  }

  async erase(): Promise<void> {
    if (isDefined(this.root)) {
      await this.root.erase();
      this.root = undefined;
    }
  }

  private async insertNode(node: Node, value: any): Promise<Node> {
    if (value < node.value) {
      if (!node.left) {
        node.left = new Node(value);
      } else {
        await this.insertNode(node.left, value);
      }
    } else if (value > node.value) {
      if (!node.right) {
        node.right = new Node(value);
      } else {
        await this.insertNode(node.right, value);
      }
    }

    // Update height
    node.height =
      1 +
      Math.max(
        node.left ? node.left.height : 0,
        node.right ? node.right.height : 0,
      );

    // Check for imbalance and re-balance
    return this.checkBalance(node);
  }

  private async deleteNode(node: Node, value: any): Promise<Node> {
    if (!node) {
      return null;
    }

    if (value < node.value) {
      node.left = await this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = await this.deleteNode(node.right, value);
    } else {
      if (!node.left || !node.right) {
        return node.left || node.right;
      }

      const successor = await this.findMin(node.right);
      node.value = successor.value;
      node.right = await this.deleteNode(node.right, successor.value);
    }

    // Update height
    node.height =
      1 +
      Math.max(
        node.left ? node.left.height : 0,
        node.right ? node.right.height : 0,
      );

    // Check for imbalance and re-balance
    return this.checkBalance(node);
  }
}

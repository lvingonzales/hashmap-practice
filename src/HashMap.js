class HashMap {
    constructor() {
        this.loadFactor = .80;
        this.capacity = 16;
        this.buckets = new Array (this.capacity);
    }

    set(key, value) {
        let keyCode = hash(key);
        let existingNodes = this.buckets.filter(node => node !== undefined);
        let matchingNode = existingNodes.find(node => node.key === key);

        if (matchingNode) {
            matchingNode.value = value;
        } else {
            let bucket = keyCode % 16;

            let newNode = new Node(key, value);
            this.buckets[bucket] = newNode;
        }
    }
}

class Node {
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
}

function hash(key) {
    let hashCode= 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }

    return hashCode;
}

export {HashMap};

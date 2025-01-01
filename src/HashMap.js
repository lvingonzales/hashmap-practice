import { LinkedList } from "./LinkedList.js";

class HashMap {
    constructor() {
        this.loadFactor = .80;
        this.capacity = 16;
        this.buckets = new Array (this.capacity);
    }

    set(key, value) {
        let keyCode = hash(key);
        let newNode = new Node(key, value);
        let existingNodes = this.buckets.filter(node => node !== undefined);
        let matchingBucket = existingNodes.find(node => hash(node.value.key) === keyCode);
        if (matchingBucket !== undefined) {
            let matchingNode = matchingBucket.at(findByKey(newNode.key));
            if (matchingNode) {
                matchingNode.value.value = newNode.value;
            }
        } else {
            let bucket = keyCode % 16;

            if (!this.buckets[bucket]) {
                console.log (`Bucket: ${bucket} is empty`);
                let newLinkedList = new LinkedList();
                newLinkedList.append(newNode);
                this.buckets[bucket] = newLinkedList;
            } else {
                this.buckets[bucket] = newNode;
            }
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

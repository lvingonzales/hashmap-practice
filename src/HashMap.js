import { LinkedList } from "./LinkedList.js";

class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = .75;
        this.buckets = new Array (this.capacity);
    }

    set(key, value) {
        let keyCode = hash(key);
        let newNode = new Node(key, value);
        let bucket = keyCode % 16;
        indexCheck(bucket, this.buckets);

        let matchingNode = hashSearch(this, key);

        if (matchingNode.node !== null) {
            matchingNode.node.value.value = newNode.value;
        } else if(this.buckets[bucket]) {
            this.buckets[bucket].append(newNode);
        } else {
            // Creating a new Linked List for an empty bucket
            let newLinkedList = new LinkedList();
            newLinkedList.append(newNode);
            this.buckets[bucket] = newLinkedList;
        }

        if (this.length() >= (this.loadFactor * this.capacity)) {
            console.log (`expanding HashMap`);
            let newBuckets = new Array (this.capacity * 2);
            for (let i = 0; i < this.buckets.length; i++) {
                newBuckets[i] = this.buckets[i];
            }
            this.buckets = newBuckets;
            this.capacity = newBuckets.length;
        }
    }

    get(key){
        let matchingNode = hashSearch(this, key);
        if (matchingNode.node !== null) {return matchingNode.value.value}
    }

    has(key) {
        let matchingNode = hashSearch(this, key);
        if (matchingNode.node === null) {return false}
        return true;
    }

    remove(key) {
        let matchingNode = hashSearch(this, key);
        if (matchingNode.node !== null) {
            let index = matchingNode.matchingBucket.find(matchingNode.node);

            matchingNode.matchingBucket.removeAt(index);
            return true;
        }
        return false;
    }

    length() {
        let size = 0;
        let existingNodes = this.buckets.filter(node => node !== undefined);
        existingNodes.forEach(linkedList => {
            size = size + linkedList.size();
        });
        return size;
    }

    clear() {
        this.buckets = new Array (this.capacity);
    }
    
    keys() {
        let keys = [];
        let existingNodes = this.buckets.filter(node => node !== undefined);
        existingNodes.forEach(linkedList => {
            linkedList.list.forEach(node => {
                keys.push(node.value.key);
            })
        });

        return keys;
    }

    values() {
        let values = [];
        let existingNodes = this.buckets.filter(node => node !== undefined);
        existingNodes.forEach(linkedList => {
            linkedList.list.forEach(node => {
                values.push(node.value.value);
            })
        });

        return values;
    }

    entries() {
        let entries = [];
        let existingNodes = this.buckets.filter(node => node !== undefined);
        existingNodes.forEach(linkedList => {
            linkedList.list.forEach(node => {
                entries.push(node.value);
            })
        });

        return entries;
    }
}

class Node {
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
}

function indexCheck (index, buckets) {
    if (index < 0 || index >= buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
}

function hashSearch(hashmap, key) {
    // Check for a already existing node
    let node = null;

    let existingNodes = hashmap.buckets.filter(node => node !== undefined);
    let matchingBucket = existingNodes.find(node => node.list.find(subnode => hash(subnode.value.key) === hash(key)));
    if (matchingBucket !== undefined) {
        node = matchingBucket.findByKey(key);
        if (node === undefined) {
            node = null;
        }
    } 
    return {node, matchingBucket};
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

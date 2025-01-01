class HashMap {
    constructor() {
        this.loadFactor = .80;
        this.capacity = 16;
        this.buckets = new Array (this.capacity);
    }

    set(key, value) {
        let keyCode = hash(key);
        let existingKey = this.buckets.find((node) => node.key === keyCode)
        
        if(existingKey) {
            existingKey.value = value;
        } else {
            let bucket = keyCode % 16;

            let newNode = new Node(keyCode, value);
            buckets[bucket] = newNode;
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

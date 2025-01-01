class LinkedList {
    constructor () {
        this.list = [];
    }

    append(value) {
        let newNode = new Node;
        newNode.value = value;

        // Changing the nextNode of the previous tail
        if (this.size() >= 2) {
            this.tail().nextNode = newNode;
        }

        this.list.push(newNode);  
    }

    prepend (value) {
        let newNode = new Node;
        newNode = {value:value, nextNode: this.list[0]};
        this.list.unshift(newNode);
    }

    size () {
        return this.list.length;
    }

    head () {
        return this.list[0];
    }

    tail() {
        return this.list[this.size() - 1];
    }

    at(index) {
        if(index > (size - 1) || index < 0) {return console.error('Index not within List!');}
        return this.list[index];
    }

    pop() {
        if (!this.size){return console.error('List Empty!');}
        this.list.pop();
        this.tail().nextNode = null;
    }

    contains(value) {
        const values = this.list.map(nodes => nodes.value);
        if (!values.includes(value)) {return console.error ('Node not found!');}
        return values.includes(value);
    }

    find(value) {
        const values = this.list.map(nodes => nodes.value);
        if (this.contains(value)) {return values.findIndex((foo) => foo === value);};
        
    }

    toString() {
        let string;
        const values = this.list.map(nodes => nodes.value);
        for (let i = 0; i <= this.size(); i++) {
            if (i === 0) {
                string = `( ${values[i]} )`;
                continue;
            }

            if (!values[i]){
                string = string + ` ->  null `;
                continue;
            }

            string = string + ` -> ( ${values[i]} )`;
        }

        return string;
    }

    insertAt(value, index){
        let newNode = new Node();
        newNode.value = value;

        if(this.list[index]) {
            newNode.nextNode = this.list[index];
        }

        this.list.splice(index, 0, newNode);

        this.list[index-1].nextNode = newNode;
        
    }

    removeAt(index){
        this.list.splice(index, 1);

        this.list[index-1].nextNode = this.list[index];

        if (!this.list[index-1].nextNode){this.list[index-1].nextNode = null;}
    }

}

class Node {
    constructor () {
        this.value = null;
        this.nextNode = null;
    }
}

export {LinkedList};

let foo = {
    capacity: 3,
    loadFactor: 0.75,
    buckets: new Array (3),

    expand(bar) {
        let index = this.buckets.findIndex(element => element === undefined)
        this.buckets[index] = bar;

        console.log(Number(this.loadFactor * this.capacity));
        if (this.length() >= Math.floor(this.loadFactor * this.capacity)) {
            console.log(`expanding`);
            let newBuckets = new Array (this.capacity * 2);
            for (let i = 0; i < this.buckets.length; i++) {
                newBuckets[i] = this.buckets[i];
            }
            this.buckets = newBuckets;
            this.capacity = newBuckets.length;
        }
    },

    length() {
        let size = 0;
        this.buckets.forEach(element => {
            if (element !== undefined){
                size++
            }
        })
        return size;
    }
}




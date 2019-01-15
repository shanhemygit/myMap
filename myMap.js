function MyMap() {
    this.init()
}
MyMap.prototype.len = 8;
MyMap.prototype.bucket = [];
MyMap.prototype.init = function () {
    for (let i = 0; i < this.len; i++) {
        this.bucket[i] = { next: null };
    }
}
MyMap.prototype.set = function (key, value) {
    let hash = this.makeHash(key);
    let list = this.bucket[hash % this.len];
    let nextNode = list;
    while (nextNode.next) {
        if (Object.is(nextNode.key, key)) {
            nextNode.value = value;
            return;
        } else {
            nextNode = nextNode.next
        }
    }
    nextNode.next = { key, value, next:null};
}
MyMap.prototype.get = function (key) {
    let hash = this.makeHash(key);
    let list = this.bucket[hash % this.len];
    let nextNode = list.next;
    while (nextNode.next) {
        if (Object.is(nextNode.key, key)) {
            return nextNode.value;
        } else {
            nextNode = nextNode.next;
        }
    }
    return;
}
MyMap.prototype.has = function (key) {
    let hash = this.makeHash(key);
    let list = this.bucket[hash % this.len];
    let nextNode = list.next;
    while (nextNode.next) {
        if (Object.is(nextNode.key, key)) {
            return true;
        } else {
            nextNode = nextNode.next;
        }
    }
    return false;
}
MyMap.prototype.delete = function (key) {
    let hash = this.makeHash(key);
    let list = this.bucket[hash % this.len];
    let nextNode = list;
    while (nextNode.next) {
        if (Object.is(nextNode.next.key, key)) {
            nextNode.next = nextNode.next.next;
            return true;
        } else {
            nextNode = nextNode.next;
        }
    }
    return false;
}
MyMap.prototype.clear = function () {
    this.init();
}
MyMap.prototype.makeHash = function (key) {
    let hash = 0;
    if (!Object.is(NaN, key)) {
        if (!(typeof (key) === "number")) {
            let str = toString(key);
            let len = str.length > 3 ? str.length : 3;
            for (let i = len - 3; i < len; i++) {
                hash += (str[i] !== undefined) ? str[i].charCodeAt() : 0;
            }
        } else {
            hash = key;
        }
        
    }else{
        hash = 0;
    }
    return hash;
}
let hash = MyMap.prototype.makeHash;
let map = new MyMap();
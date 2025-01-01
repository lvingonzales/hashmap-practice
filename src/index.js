import { HashMap } from "./HashMap.js";
//import "./style.css";

let hashmap = new HashMap();

hashmap.set("hat", "red");
hashmap.set("hat", "blue");

console.log (hashmap.buckets);

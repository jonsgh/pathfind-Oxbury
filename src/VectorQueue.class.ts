/*
    ------- QUEUE ------
    Standard queue class - FIFO data structure.
    Used exclusively for storing vector data types.
*/

import { Vector } from "./Vector.type"


export class VectorQueue {
    private storage: Vector[];
    private headPointer: number;
    private tailPointer: number;

    constructor(private capacity: number) {
        this.storage = new Array(capacity);
        this.headPointer = 0; // Inclusive head pointer
        this.tailPointer = 0; // Exclusive tail pointer
    }

    public enqueue(value: Vector) {
        /*
            Standard enqueue function. Enqueues a value to the queue, provided queue is not full.

            value - Vector value to be enqueued
        */
        
        if(this.isFull()) {
            throw new Error("ERROR: QUEUE IS FULL - CANNOT ADD" + value); // Throws error if queue is full
        }
        else {
            this.storage[this.tailPointer] = value;
            this.tailPointer++; 
        }

    }

    public dequeue() {
        /*
            Standard dequeue function. Dequeues a value from the queue and returns it, provided the queue is not empty.
        */

        if(this.isEmpty()) {
            throw new Error("ERROR: QUEUE IS EMPTY - CANNOT DEQUEUE"); // Throws error if queue is empty
        }
        else {
            this.headPointer++;
            return this.storage[this.headPointer - 1];
        }
    }

    private isFull() {
        /*
            Returns a boolean depicting whether the queue is full or not.
        */

        if(this.tailPointer == this.storage.length - 1) {
            return true;
        }
        return false;
    }

    private isEmpty() {
        /*
            Returns a boolean depicting whether the queue is empty or not
        */

        if(this.headPointer == this.tailPointer) {
            return true;
        }
        return false;
    }

}
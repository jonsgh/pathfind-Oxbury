/*
    ------- PRIORITY QUEUE ------
    Priority queue class - FIFO data structure.
    Used exclusively for storing vector data types.

    Vectors in the queue are stored in a priority order
    with two levels of priority - whether the vector 
    heads towards the target Q or whether it heads away
    from the target.
    Vectors are stored with two queues - each one pertaining
    to the priority level
*/

import { Vector } from "./Vector.type"
import { VectorQueue } from "./VectorQueue.class"


export class VectorPriorityQueue {
    private higherPrioQueue : VectorQueue; // Higher priority queue
    private lowerPrioQueue : VectorQueue; // Lower priority queue

    constructor(private capacity: number) {
        this.higherPrioQueue = new VectorQueue(capacity);
        this.lowerPrioQueue = new VectorQueue(capacity);
    }

    public enqueue(value: Vector, priority: boolean) {
        /*
            Enqueues a value to either the higher or lower priority queue

            value - Vector value to be enqueued
            priority - if true, put in higher priority queue - else, put in lower priority queue
        */

        try {
            // Try catch block as VectorQueue.enqueue can throw an error
            if(priority) {
                this.higherPrioQueue.enqueue(value);
            }
            else {
                this.lowerPrioQueue.enqueue(value);
            }
        }
        catch(e) {
            // Pass error upwards
            throw e;
        }
    }

    public dequeue() {
        /*
            If higher queue is not empty, dequeue from higher priority queue. Else, dequeue from lower priority queue.
        */
        try {
            return this.higherPrioQueue.dequeue();
        }
        catch(higherPrioEmpty) {
            // Above catch statement will trigger if higher priority queue is empty.
            try {
                return this.lowerPrioQueue.dequeue();
            }
            catch(e) {
                // This catch will trigger if lower priority queue is empty.
                // Pass error upwards
                throw e;
            }
        }
    }

}
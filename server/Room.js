import { v4 as uuidv4 } from "uuid";
import Queue from "./queue.js"; 

export let NUM_OF_PLAYERS = 0;

const queue = new Queue();

export class RoomManager {
  constructor(io) {
    this.rooms = new Map();
    this.io = io;
  }

  createRoom(user1, user2) {
    const roomId = uuidv4();
    this.rooms.set(roomId, { user1, user2 });
    return roomId;
  }

  async addUser(socketId) {
    await new Promise(resolve => setTimeout(resolve, 3000));

    NUM_OF_PLAYERS++;
    console.log("Number of players --->", socketId, "=>", NUM_OF_PLAYERS);
    queue.enqueue({ id: socketId });
    console.log("PLAYERS IN QUEUE ->", queue.size());

    if (queue.size() > 1) {
      console.log(":: Pair found ::");
      const user1 = queue.dequeue();
      const user2 = queue.dequeue();

      if (user1 && user2) {
        console.log("requesting offer");
        const room = this.createRoom(user1, user2);
        this.io.to(user1.id).to(user2.id).emit("joined", { room });
        this.io.to(user1.id).emit("send-offer");
        console.log("sent offer request to ::", user1.id);
      }
    } else {
      console.log("NO PAIR FOUND");
    }

    this.io.emit("user-count", NUM_OF_PLAYERS);
  }

  handleOffer(socketId, roomId, offer) {
    console.log("OFFER SENT BY ::", socketId, "FOR ROOM ::", roomId);

    const room = this.rooms.get(roomId);
    if (!room) return;

    const receiver = room.user1.id === socketId ? room.user2.id : room.user1.id;
    console.log("SENDING OFFER TO ::", receiver);
    this.io.to(receiver).emit("offer", offer);
  }

  handleAnswer(socketId, roomId, offer) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const receiver = room.user1.id === socketId ? room.user2.id : room.user1.id;
    console.log("RECEIVED ANSWER SENDING TO ::", receiver);
    this.io.to(receiver).emit("answer", offer);
  }

  handleIceCandidates(socketId, roomId, iceCandidates) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const receiver = room.user1.id === socketId ? room.user2.id : room.user1.id;
    this.io.to(receiver).emit("ice-candidates", iceCandidates);
  }

  handleDisconnect(socketId) {
    console.log("DISCONNECTED ::", socketId);
    const itemToRemove = queue.find(socketId);
    NUM_OF_PLAYERS--;
    queue.printQueue();

    if (itemToRemove) {
      queue.remove(itemToRemove);
      console.log(`Removed item with id ${socketId}.`);
    }

    queue.printQueue();

    this.rooms.forEach((room, roomId) => {
      console.log(
        "ROOM ::",
        roomId,
        "USER1 ::",
        room.user1.id,
        "USER2 ::",
        room.user2.id
      );

      if (room.user1.id === socketId || room.user2.id === socketId) {
        this.rooms.delete(roomId);
        console.log("DELETING ROOM ::", roomId);
        this.io.to(room.user1.id).to(room.user2.id).emit("leaveRoom");
      }
    });

    this.io.emit("user-count", NUM_OF_PLAYERS);
  }

  handleLeaveRoom(socketId) {
    console.log("LEAVING REQUEST FROM ::", socketId);

    this.rooms.forEach((room, roomId) => {
      console.log(
        "ROOM ::",
        roomId,
        "USER1 ::",
        room.user1.id,
        "USER2 ::",
        room.user2.id
      );

      if (room.user1.id === socketId || room.user2.id === socketId) {
        this.rooms.delete(roomId);
        console.log("DELETING ROOM ::", roomId);
        this.io.to(room.user1.id).to(room.user2.id).emit("leaveRoom");
      }
    });
  }

  handleMessage(roomId, socketId, message) {
    console.log("MESSAGE RECEIVED IN ::", roomId);
    const room = this.rooms.get(roomId);
    if (!room) return;

    const receiver = room.user1.id === socketId ? room.user2.id : room.user1.id;
    this.io.to(receiver).emit("message", message);
  }
}

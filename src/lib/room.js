import { v4 as uuidv4 } from "uuid";

export default class Room {
  constructor(userA, userB) {
    this.id = uuidv4();
    this.users = [userA, userB];
    this.init();
  }

  init() {
    this.users.forEach((socket) => {
      socket.join(this.id);
      socket.emit("room-joined", { roomId: this.id });
    });
  }
}

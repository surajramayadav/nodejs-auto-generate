const _ = require("lodash");
const chalk = require("chalk");

let users = [];
class WebSockets {
  connection(client) {
    console.log("******A CLIENT CONNECTED*******", client.handshake.address);

    // add identity of user mapped to the socket id
    client.on("identity", (userId, UserMobile, userName) => {
      console.log(
        "******A CLIENT identity*******",
        userId,
        UserMobile,
        userName
      );
      const connectedUser = _.find(users, (user) => {
        // console.log("user", user, UserMobile);hey world
        return user.userMobile == UserMobile;
      });
      // console.log("find", connectedUser, typeof connectedUser);
      // if (typeof connectedUser !== undefined) {
      let newUser = {
        socketId: client.id,
        userId: userId,
        userName: userName,
        userIP: client.handshake.address,
        userMobile: UserMobile,
      };
      if (!connectedUser) {
        users.push(newUser);
      } else {
        connectedUser.socketId = client.id;
      }

      client.emit("welcome", newUser);
      // client.broadcast.emit("allusers");
    });
    client.on("allusers", () => {
      console.log("ALL USERS", users);
      client.emit("allChattrs", users);
    });

    // event fired when the chat room is disconnected
    client.on("disconnect", () => {
      console.log("disconnect");
      console.log("******A CLIENT ENDED*******");

      // this.users = this.users.filter((user) => user.socketId !== client.id);
    });
    client.on("message", (evt) => {
      console.log(evt);
      client.broadcast.emit("message", evt);
    });

    // subscribe person to chat & other user as well
    client.on("subscribe", (room, otherUserId = "") => {
      console.log("====================================");
      console.log(room, otherUserId);
      console.log("====================================");
      // this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });
    // mute a chat room
    client.on("unsubscribe", (room) => {
      client.leave(room);
    });

    client.on("makechattr", (user, friend, message) => {
      const friendlyUser = _.find(users, (user) => (user.userId = friend));
      console.log(
        chalk.red("makechattr", user, friend, friendlyUser, message)
      );
      // client.emit("makechattr", evt);
      client.broadcast.emit("makechattr", user, friend, message);
    });

    // event fired when the chat room is disconnected
    client.on("disconnect", () => {
      console.log("disconnect");
      console.log("******A CLIENT ENDED*******");

      // this.users = this.users.filter((user) => user.socketId !== client.id);
    });
  }

  subscribeOtherUser(room, otherUserId) {
    const userSockets = this.users.filter(
      (user) => user.userId === otherUserId
    );
    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.connected(userInfo.socketId);
      if (socketConn) {
        socketConn.join(room);
      }
    });
  }
}
const ws = new WebSockets();
module.exports = ws;

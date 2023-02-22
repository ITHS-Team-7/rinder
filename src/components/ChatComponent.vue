<script setup>
import users from "../assets/data/users.json";
import moment from "moment";
</script>

// TODO: set globally box-sizing property to border-box

<template>
  <div id="chat">
    <div id="chatSelect">
      <div
        :key="index"
        v-for="(chat, index) in loggedInUser.chats"
        @click="openChat(chat.userName)"
        :class="chat.userName === currentChatUsername ? 'selected' : ''"
      ><img class="avatar" :src="getUser(chat.userName).avatar" alt="avatar" />
        <div>

        <p class="name">{{ getUser(chat.userName).firstName }} {{ getUser(chat.userName).lastName }}</p>

        <p class="lastMessage">
          {{ chat.messages[chat.messages.length - 1].type }}: {{ chat.messages[chat.messages.length - 1].message }}
        </p>
        </div>
      </div>
      <div v-if="!loggedInUser.chats.length">
        <p>You don't have any open chats...</p>
      </div>
    </div>
    <div id="selectedChatContainer" v-if="currentChatUsername !== null">
      <div
        v-for="(message, index) in loggedInUser.chats.find(
          (chat) => chat.userName === currentChatUsername
        ).messages"
        :class="'chatMessage ' + message.type"
        :key="index"
      >
        {{ moment.unix(message.time).format("YYYY-MM-DD HH:mm:ss") }}
        {{ message.message }}
      </div>
      <div id="chatInputsContainer">
        <form @submit="(e) => e.preventDefault()">
          <input type="text" v-model="chatMessageInput" />
          <input type="submit" @click="sendMessage()" value="Send" />
        </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatComponent",
  data() {
    return {
      currentChatUsername: null,
      loading: true,
      // TODO: replace this with actual logged in user
      loggedInUser: users[0],
      chatMessageInput: "",
    };
  },
  methods: {
    openChat(userName) {

      this.chatMessageInput = "";

      // TODO: ability to open chat with new user

      // if chat is already open then close it
      if (this.currentChatUsername === userName) {
        this.currentChatUsername = null;
      } else {
        this.currentChatUsername = userName;
      }
    },
    sendMessage() {
      if (!this.chatMessageInput) {
        return;
      }

      // add message to current logged in user messages list
      this.loggedInUser.chats
        .find((chat) => chat.userName === this.currentChatUsername)
        .messages.push({
          time: moment().unix(),
          message: this.chatMessageInput,
          type: "sent",
        });

      // also add message to the receiving user message list
      const receivingUser = users.find(
        (user) => user.userName === this.currentChatUsername
      );
      let receivingUserChat = receivingUser.chats.find(
        (chat) => chat.userName == this.loggedInUser.userName
      );

      if (receivingUserChat) {
        console.log("Chat exists in receiving users chat list");
        receivingUserChat.messages.push({
          time: moment().unix(),
          message: this.chatMessageInput,
          type: "received",
        });
      } else {
        console.log(
          "Chat doesn't exists in receiving users chat list, creating it now"
        );
        receivingUser.chats.push({
          userName: this.loggedInUser.userName,
          messages: [
            {
              time: moment().unix(),
              message: this.chatMessageInput,
              type: "received",
            },
          ],
        });
      }

      this.chatMessageInput = "";
    },
  },
};

/*
// Returns url of an avatar based on the users gender
function getAvatarUrl(userName) {
  const user = getUser(userName);
  const nameInitials = user.firstName[0] + user.lastName[0]
  //return 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=128&name=' + nameInitials;
  return `https://xsgames.co/randomusers/avatar.php?g=${user.gender.toLowerCase()}&name=${nameInitials}`
}
 */

// TODO: add error handling if user not found
function getUser(userName) {
  return users.find(
    (user) => user.userName.toLowerCase() === userName.toLowerCase()
  );
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
#chat {
  border: 0.1rem solid red;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  background: #fff;
  color: #000;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

#selectedChatContainer {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
}

#chatSelect {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: fit-content;
  border: 0.1rem solid red;
  border-radius: 10px;
  padding: 0.5rem;
}

#chatSelect div {
display: flex;
  gap: .5rem;
  border-radius: 10px;
padding: .5rem 1rem;
}

#chatSelect > div > div {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-content: center;
  cursor: pointer;
}

.name {
  font-weight: bold;
  color: darkblue;
}

#chatSelect > div.selected {
  outline: .2rem solid blueviolet ;
}

.chatMessage {
  background: #3b71ca;
  color: #fff;
  padding: .4rem .7rem;
  border-radius: 10px;
  font-size: .9rem;
}

.lastMessage {
  color: #222222;
  font-size: .8rem;
}

.sent {
  margin-left: auto;
}

.received {
  margin-right: auto;
}

.avatar {
  border-radius: 50%;
  height: 4rem;
  border: 0.2rem solid green;
}

#chatInputsContainer {
  margin: auto 0 0 auto;

}
</style>

<script setup>
import users from "../assets/data/users.json";
import moment from "moment";
</script>

// TODO: set globally box-sizing property to border-box and margin padding to 0

<template>
  <div id="chat">
    <div id="chatSelect">
      <div id="newChatSelect">
        <input v-if="!showNewChatSection" type="button" value="Start new chat" @click="showNewChatSection = true">
        <div v-else>
          <input type="button" value="Close" @click="showNewChatSection = false">
          <div class="newChatSelectUser" v-for="user in users">
            {{ user.userName }}
          </div>
        </div>
      </div>
      <div
        :key="index"
        v-for="(chat, index) in loggedInUser.chats"
        @click="openChat(chat.userName)"
        :class="chat.userName === activeChatUser?.userName ? 'selected' : ''"
      ><img class="avatar" :src="getUser(chat.userName).avatar" alt="avatar" @click.stop="goToProfile(chat.userName)"/>
        <div>

        <p class="name">{{ getUser(chat.userName).firstName }} {{ getUser(chat.userName).lastName }}</p>

        <p class="lastMessage">
          {{ chat.messages[chat.messages.length - 1].type }}: {{ chat.messages[chat.messages.length - 1].message }}
        </p>
        </div>
        <div id="chatSelectOptions">
          <input type="button" value="X" @click.stop="deleteChat(chat.userName)">
        </div>

      </div>
      <div v-if="!loggedInUser.chats.length">
        <p>You don't have any open chats...</p>
      </div>
    </div>
    <div id="selectedChatContainer" v-if="activeChatUser !== null">
      <div
        v-for="(message, index) in loggedInUser.chats.find(
          (chat) => chat.userName === activeChatUser?.userName
        )?.messages"
        :class="'chatMessage ' + message.type"
        :key="index"
      >
        {{ moment.unix(message.time).format("YYYY-MM-DD HH:mm:ss") }}
        {{ message.message }}
      </div>
      <div id="chatInputsContainer">
        <form @submit="sendMessage">
          <input type="text" v-model="chatMessageInput" />
          <input type="submit" value="Send" />
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
      activeChatUser: null,
      loading: true,
      // TODO: replace this with actual logged in user
      loggedInUser: users[0],
      chatMessageInput: "",
      showNewChatSection: false
    };
  },
  methods: {
    openChat(userName) {

      this.chatMessageInput = "";

      // TODO: ability to open chat with new user

      // if chat is already open then close it
      if (this.activeChatUser?.userName === userName) {
        this.activeChatUser = null;
      } else {
        this.activeChatUser = getUser(userName);
      }
    },
    deleteChat(userName) {
      this.chatMessageInput = "";

      console.log('Removing chat with ' + userName)

      // add message to current logged in user messages list
      this.loggedInUser.chats.splice(
        this.loggedInUser.chats.findIndex((chat) => chat.userName === userName),
        1
      );
    },
    sendMessage(evt) {
      evt.preventDefault();

      if (this.chatMessageInput) {

        // add message to current logged in user messages list
        this.loggedInUser.chats
            .find((chat) => chat.userName === this.activeChatUser?.userName)
            .messages.push({
          time: moment().unix(),
          message: this.chatMessageInput,
          type: "sent",
        });

        // also add message to the receiving user message list
        const receivingUser = users.find(
            (user) => user.userName === this.activeChatUser?.userName
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
      }

    },
    goToProfile(userName) {
      // TODO: redirect to user profile page
      console.log(getUser(userName))
    }
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
  min-width: fit-content;
  border: 0.1rem solid red;
  border-radius: 10px;
  padding: 0.5rem;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

#chatSelect div {
  display: flex;
  gap: 0 1rem;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;  cursor: pointer;
  padding: 1rem 0.5rem;
}

#chatSelect > div > div {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-content: center;

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
  cursor: pointer;
}

#chatInputsContainer {
  margin: auto 0 0 auto;

}

.newChatSelectUser {
  border: .1rem solid red;
}
</style>

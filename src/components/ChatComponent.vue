<script setup>
import users from "../assets/data/users.json";
import moment from "moment";
</script>

// TODO: set globally box-sizing property to border-box and margin padding to 0

<template>
  <div id="chat">
    <div id="chatSelectContainer">
      <!-- + 1 needed to compensate for currently logged in user -->
      <div id="openNewChat" v-if="ableToOpenNewChat">
        <input
          v-if="!showNewChatSection"
          type="button"
          value="Start new chat"
          @click="showNewChatSection = true"
          class="btn btn-primary"
        />
        <div v-else>
          <input
            type="button"
            value="Close"
            @click="showNewChatSection = false"
            class="btn btn-primary"
          />
          <!-- Filter users to exclude currently logged in user -->
          <div
            :key="index"
            class="openNewChatUser"
            v-for="(user, index) in users.filter(
              (user) =>
                user.userName !== loggedInUser.userName &&
                !openChatsUsernames.includes(user.userName)
            )"
            @click="openChat(user.userName)"
          >
            {{ user.userName }}
          </div>
        </div>
      </div>
      <!--<div id="openNewChat" v-else>
        No new users available to add...
      </div>-->
      <div
        :key="index"
        v-for="(chat, index) in loggedInUser.chats"
        @click="openChat(chat.userName)"
        :class="
          chat.userName === activeChatUser?.userName
            ? 'chatSelect selected'
            : 'chatSelect'
        "
      >
        <img
          class="avatar"
          :src="getUser(chat.userName).avatar"
          alt="avatar"
          @click.stop="goToProfile(chat.userName)"
        />
        <div>
          <p class="name">
            {{ getUser(chat.userName).firstName }}
            {{ getUser(chat.userName).lastName }}
          </p>

          <p class="lastMessage" v-if="chat.messages.length">
            {{ chat.messages[chat.messages.length - 1].type }}:
            {{ chat.messages[chat.messages.length - 1].message }}
          </p>
          <p class="lastMessage" v-else>...</p>
        </div>
        <div id="chatSelectContainerOptions">
          <input
            type="button"
            value="X"
            @click.stop="deleteChat(chat.userName)"
            class="btn btn-danger"
          />
        </div>
      </div>
      <div v-if="!loggedInUser.chats.length">
        <p>You don't have any open chats...</p>
      </div>
    </div>
    <div id="activeChatContainer" v-if="activeChatUser !== null">
      <div id="activeChatNameContainer">
        <h2>
          {{ activeChatUser?.firstName }} <span class="chatStatus">🟢</span>
        </h2>
      </div>
      <div id="activeChatMessagesContainer">
        <div
          v-for="(message, index) in loggedInUser.chats.find(
            (chat) => chat.userName === activeChatUser?.userName
          )?.messages"
          :class="'chatMessage ' + message.type"
          :key="index"
        >
          {{
            /*moment.unix(message.time).format("YYYY-MM-DD HH:mm:ss")*/
            null
          }}
          {{ message.message }}
        </div>
      </div>
      <div id="chatInputsContainer">
        <form @submit="sendMessage">
          <input
            type="text"
            v-model="chatMessageInput"
            class="form-control"
            placeholder="Message..."
          />
          <input type="submit" value="Send" class="btn btn-success" />
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
      showNewChatSection: false,
    };
  },
  methods: {
    openChat(userName) {
      // TODO: disable opening chat with self

      this.chatMessageInput = "";

      // TODO: ability to open chat with new user

      // if chat is already open then close it
      if (this.activeChatUser?.userName === userName) {
        this.activeChatUser = null;
      } else {
        let existingChat = this.loggedInUser.chats.find(
          (chat) => chat.userName === userName
        );

        // using unshift to "push" chat to starty of array
        if (!existingChat) {
          this.loggedInUser.chats.unshift({
            userName: userName,
            messages: [],
          });
        }

        this.activeChatUser = getUser(userName);
      }

      if (!this.ableToOpenNewChat) {
        this.showNewChatSection = false;
      }
    },
    deleteChat(userName) {
      this.chatMessageInput = "";

      console.log("Deleting chat with " + userName);

      if (this.activeChatUser?.userName === userName) {
        this.activeChatUser = null;
      }

      // delete chat from current logged in user
      this.loggedInUser.chats.splice(
        this.loggedInUser.chats.findIndex((chat) => chat.userName === userName),
        1
      );
    },
    sendMessage(evt) {
      evt.preventDefault();

      if (this.chatMessageInput) {
        // move chat to index 0 for sender
        const chatIndex = this.loggedInUser.chats.findIndex(
          (chat) => chat.userName === this.activeChatUser?.userName
        );

        this.loggedInUser.chats.unshift(
          this.loggedInUser.chats.splice(chatIndex, 1)[0]
        );

        // add message to current logged in user messages list
        this.loggedInUser.chats[0].messages.push({
          time: moment().unix(),
          message: this.chatMessageInput,
          type: "sent",
        });

        // also add message to the receiving user message list
        const receivingUser = users.find(
          (user) => user.userName === this.activeChatUser?.userName
        );

        const receiverChatIndex = receivingUser.chats.findIndex(
          (chat) => chat.userName === this.loggedInUser?.userName
        );
        let receivingUserChat = receivingUser.chats[receiverChatIndex];

        if (receivingUserChat) {
          console.log("Chat exists in receiving users chat list");

          // move chat to index 0 for receiver
          receivingUser.chats.unshift(
            receivingUser.chats.splice(receiverChatIndex, 1)[0]
          );

          receivingUserChat = receivingUser.chats[0];

          receivingUserChat.messages.push({
            time: moment().unix(),
            message: this.chatMessageInput,
            type: "received",
          });
        } else {
          console.log(
            "Chat doesn't exists in receiving users chat list, creating it now"
          );
          receivingUser.chats.unshift({
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

      this.scrollToLastMessage();
    },
    goToProfile(userName) {
      // TODO: redirect to user profile page
      console.log(getUser(userName));
    },
    scrollToLastMessage() {
      // Scroll down to last message
      // $nextTick is called after v-for has rendered all chatMessages
      this.$nextTick(() => {
        const container = document.querySelector(
          "#activeChatMessagesContainer"
        );
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
  },
  watch: {
    activeChatUser() {
      this.scrollToLastMessage();
    },
  },
  computed: {
    // get an array of usernames of all open chats
    openChatsUsernames() {
      console.log(this.loggedInUser.chats.map((chat) => chat.userName));
      return this.loggedInUser.chats.map((chat) => chat.userName);
    },
    ableToOpenNewChat() {
      return this.openChatsUsernames.length + 1 !== users.length;
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
#chat {
  border: 0.1rem solid red;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  background: #fff;
  color: #000;
  gap: 1rem;
  max-height: 50rem;

  max-width: 85rem;
  margin: 0 auto;

  display: flex;
}

#activeChatContainer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;
  grid-template-areas:
    "activeChatName"
    "activeChatMessagesContainer"
    "chatInputsContainer";
}

#activeChatMessagesContainer {
  border: 0.1rem solid red;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
  padding: 0.5rem;
  overflow-y: scroll;
  grid-area: activeChatMessagesContainer;
}

#chatSelectContainer {
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  border: 0.1rem solid red;
  border-radius: 10px;
  padding: 0.5rem;

  grid-area: chatSelectContainer;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                   supported by Chrome, Edge, Opera and Firefox */

  overflow-y: scroll;
}

#chatSelectContainer .chatSelect {
  display: flex;
  gap: 0 1rem;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem 0.5rem;
}

.chatSelect:hover {
  background-color: #d1d1d1;
}

#chatSelectContainer > div > div {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-content: center;
}

.name {
  font-weight: bold;
  color: darkblue;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#chatSelectContainer > .chatSelect.selected {
  outline: 0.2rem solid blueviolet;
}

.chatMessage {
  background: #3b71ca;
  color: #fff;
  padding: 0.4rem 0.7rem;
  border-radius: 10px;
  font-size: 0.9rem;
}

.lastMessage {
  color: #222222;
  font-size: 0.8rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  grid-area: chatInputsContainer;

  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0.5rem 0;
}

#chatInputsContainer form {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.openNewChatUser {
  border: 0.1rem solid red;
  cursor: pointer;
}

#openNewChat {
  margin: 0 auto;
  padding: 1rem 0;
}

#activeChatNameContainer {
}

.chatStatus {
  font-size: 1rem;
}
</style>

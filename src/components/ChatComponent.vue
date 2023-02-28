<script setup>
import users from "../assets/data/users.json";
import moment from "moment";
</script>

<template>
  <!-- TODO: divide chatComponent into further components -->
  <!-- TODO: use em instead of rem where appropriate -->
  <div id="chat">
    <div id="chatSelectContainer">
      <!-- + 1 needed to compensate for currently logged in user -->
      <div id="openNewChat" v-if="ableToOpenNewChat">
        <input
          v-if="!showNewChatSection"
          type="button"
          value="New Chat"
          @click="showNewChatSection = true"
          class="btn btn-success"
        />
        <template v-else>
          <input
            type="button"
            value="Close"
            @click="showNewChatSection = false"
            class="btn btn-danger"
          />
          <!-- Filter users to exclude currently logged in user -->

          <ul id="openNewChatUsersList" class="list-group">
            <li
              class="list-group-item openNewChatUser"
              :key="index"
              v-for="(user, index) in users.filter(
                (user) =>
                  user.userName !== loggedInUser.userName &&
                  !openChatsUsernames.includes(user.userName)
              )"
              @click="openChat(user.userName)"
            >
              <span style="font-weight: bold"
                >{{ user.firstName }} {{ user.lastName }}</span
              >
              ({{ user.userName }})
            </li>
          </ul>

          <!--<div
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
          </div>-->
        </template>
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
        <!-- @click.stop="goToProfile(chat.userName)" -->
        <img class="avatar" :src="getUser(chat.userName).avatar" alt="avatar" />
        <div id="nameAndLastMessageContainer">
          <p class="name">
            {{ getUser(chat.userName).firstName }}
            {{ getUser(chat.userName).lastName }}
          </p>
          <div class="lastMessage" v-if="chat.messages.length">
            <div class="clickableIconContainer">
              <font-awesome-icon
                v-if="chat.messages[chat.messages.length - 1].type === 'sent'"
                icon="fa-regular fa-circle-up"
              />
              <font-awesome-icon v-else icon="fa-regular fa-circle-down" />
            </div>
            <p>
              {{ chat.messages[chat.messages.length - 1].message }}
            </p>
          </div>
        </div>
        <!-- <div id="chatSelectContainerOptions">
        </div> -->
      </div>
      <div id="noOpenChats" v-if="!loggedInUser.chats.length">
        <p>You don't have any open chats...</p>
      </div>
    </div>

    <div id="activeChatContainer" v-if="activeChatUser !== null">
      <div id="activeChatTopContainer">
        <div id="activeChatNameContainer">
          <p @click="goToProfile(activeChatUser.userName)">
            {{ activeChatUser?.firstName }}
          </p>
          <span class="activeChatStatus">🟢</span>
        </div>

        <div id="callIconsContainer">
          <div class="clickableIconContainer">
            <font-awesome-icon icon="fa-solid fa-phone-volume" />
          </div>

          <div class="clickableIconContainer">
            <font-awesome-icon icon="fa-solid fa-video" />
          </div>
          <div
            @click="showActiveChatSettings = !showActiveChatSettings"
            class="clickableIconContainer"
          >
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
          </div>
        </div>
      </div>
      <div id="activeChatSettings" v-if="showActiveChatSettings">
        <div>
          <div
            style="color: red"
            @click.stop="deleteChat(activeChatUser.userName)"
            class="clickableIconContainer"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can" />
          </div>
        </div>
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
            id="messageInput"
            v-model="chatMessageInput"
            class="form-control"
            placeholder="Message..."
          />
          <!--<input type="button" id="emojiButton" value="😊">
          <input type="submit" value="Send" class="btn btn-success">-->
          <div id="chatInputButtons">
            <div id="emojiBtn" class="clickableIconContainer">
              <font-awesome-icon icon="fa-solid fa-face-smile" />
            </div>

            <div
              id="sendBtn"
              @click="sendMessage"
              class="clickableIconContainer"
            >
              <font-awesome-icon icon="fa-solid fa-paper-plane" />
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-else id="emptyActiveChatContainer">
      <p>
        <font-awesome-icon icon="fa-solid fa-circle-arrow-left" />
        Select a chat
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatComponent",
  data() {
    return {
      activeChatUser: null,
      showActiveChatSettings: false,
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

      this.showNewChatSection = false;
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
      this.showActiveChatSettings = false;
      this.scrollToLastMessage();
    },
    chatMessageInput(msg) {
      // user is typing...
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
  border-radius: 10px;
  background: #fff;
  color: #000;
  gap: 1rem;
  min-height: 60vh;
  max-height: 70vh;
  max-width: 80rem;
  min-width: fit-content;

  display: flex;

  padding: 1rem;
  margin: 0 auto;
  box-shadow: 0 0 5px #8843e4;
}

#activeChatContainer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr min-content;
  grid-template-areas:
    "activeChatNameContainer"
    "activeChatSettings"
    "activeChatMessagesContainer"
    "chatInputsContainer";
  padding: 0 1rem;
}

#activeChatMessagesContainer {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
  overflow: auto;
  grid-area: activeChatMessagesContainer;
  padding: 2rem 0;
  margin-top: 0.3rem;
}

#chatSelectContainer {
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  /*border: 0.1rem solid red;*/
  border-radius: 10px;

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

#chatSelectContainer::-webkit-scrollbar {
  display: none;
}

#chatSelectContainer .chatSelect {
  display: flex;
  gap: 0 1rem;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.8rem 0;
}

.chatSelect:hover {
  background-color: #e1e1e1;
}

#nameAndLastMessageContainer {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-content: center;
  text-align: center;
  max-width: 10rem;
  width: 100%;
}

.name {
  font-weight: bold;
  font-size: 1.1em;
  color: #0060ff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#activeChatMessagesContainer::-webkit-scrollbar {
  width: 0.3em;
  border-radius: 10px;
}

#activeChatMessagesContainer::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(136, 136, 136, 0.9);
  border-radius: 10px;
}

#activeChatMessagesContainer::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
}

#chatSelectContainer > .chatSelect.selected {
  background-color: #d1d1d1;
}

.chatMessage {
  padding: 0.9rem 1rem;
  border-radius: 10px;
  font-size: 1.2em;
  font-weight: 500;
}

.lastMessage {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.lastMessage .clickableIconContainer {
  color: #196900;
  font-size: 1.2em;
  margin-right: 0.3rem;
}

.lastMessage p {
  display: inline;
  color: #222222;
  font-size: 1em;
}

.sent {
  margin-left: auto;
  margin-right: 0.2rem;
  background-color: #8843e4;
  color: #fff;
}

.received {
  margin-right: auto;
  background-color: #d9d9d9;
  color: #000;
}

.avatar {
  border-radius: 50%;
  height: 5rem;
  border: 0.2rem solid white;
  cursor: pointer;
}

#chatInputsContainer {
  margin: auto 0 0 auto;
  grid-area: chatInputsContainer;

  width: 100%;
  padding: 0.5rem 1rem 0.5rem 0;
}

#chatInputsContainer form {
  display: flex;
  gap: 2rem;
  width: 100%;
}

.openNewChatUser {
  cursor: pointer;
}

.openNewChatUser:hover {
  background-color: #606060;
  color: white;
}

#openNewChat {
  margin: 0 auto;
  padding: 1em 0;
}

#openNewChat input {
  display: block;
  margin: 0 auto;
}

#activeChatTopContainer {
  display: flex;

  justify-content: space-between;
  padding: 1rem 1rem 1rem 0;
}

.activeChatStatus {
  font-size: 0.6em;
}

.clickableIconContainer {
  font-size: 2.3em;
  margin: auto 0;
  cursor: pointer;
  display: inline;
  min-width: 2rem;
  text-align: center;
}

#messageInput {
  border: 0.15rem solid #252525;
  border-radius: 10px;
  font-size: 1.2em;
  font-weight: 500;
}

#callIconsContainer {
  display: flex;
  gap: 3rem;
}

#activeChatNameContainer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 2.5em;

  grid-area: activeChatNameContainer;

  font-weight: bold;
}

#activeChatNameContainer p {
  cursor: pointer;
}

#chatInputButtons {
  display: flex;
  gap: 1.5rem;
}

p {
  margin: 0;
}

#emojiBtn {
  color: #ff6a00;
}

#sendBtn {
  color: purple;
}

#activeChatSettings {
  width: fit-content;
  position: relative;
  left: 80%;
  grid-area: activeChatSettings;
  padding: 1em;
  border: 0.1rem solid blue;
  border-radius: 10px;
}

#openNewChatUsersList {
  margin-top: 1rem;
  text-align: center;
}

.openNewChatUser {
  padding: 0.5rem 0.2rem;
}

#emptyActiveChatContainer {
  border: 0.2rem solid purple;
  border-radius: 10px;
  margin: 10rem auto;
  width: 100%;
  font-size: 2em;
  max-width: 25rem;
}

#emptyActiveChatContainer p {
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  text-align: center;
}

#noOpenChats {
  text-align: center;
}

@media (max-width: 1000px) {
  #chat {
    font-size: 0.8rem;
    gap: 1rem;
    min-height: 50vh;
    max-height: 70vh;

    max-width: 80rem;

    padding: 1rem;
    margin: 0 1rem;
  }

  #chatSelectContainer .chatSelect {
    gap: 0 1rem;
    padding: 0.8rem 0;
    flex-direction: column;
  }

  #chatSelectContainer {
    min-width: 10rem;
    /*border: 0.1rem solid red;*/
    border-radius: 10px;
  }

  #callIconsContainer {
    gap: 2rem;
  }

  #chatInputsContainer form {
    gap: 1rem;
  }

  #chatInputButtons {
    gap: 1rem;
  }
}

@media (max-width: 700px) {
  #chat {
    gap: 0.25rem;
    min-height: 50vh;
    max-height: 50vh;
    max-width: 80rem;

    margin: 0 0.5rem;

    padding: 0.2rem;
    font-size: clamp(0.5rem, 1.5vw, 0.8rem);
  }

  #chatSelectContainer {
    min-width: 7rem;
  }

  #callIconsContainer {
    gap: 0.5rem;
  }

  #activeChatContainer {
    padding: 0 0.5rem;
  }

  #emptyActiveChatContainer {
    width: 100%;
    font-size: 2em;
  }

  #activeChatTopContainer {
    padding-right: 0;
  }

  #chatInputsContainer {
    padding: 1rem 0 0.5rem 0.5rem;
  }

  #chatInputsContainer form {
    gap: 0.5rem;
  }

  #chatInputButtons {
    gap: 0rem;
  }

  .chatMessage {
    padding: 0.6rem 0.5rem;
    border-radius: 10px;
    font-size: 1.2em;
  }

  #openNewChat input {
    font-size: 0.8rem;
  }

  .avatar {
    height: 4rem;
  }
}
</style>

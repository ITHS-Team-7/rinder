<script setup>
import users from "../assets/data/users.json";
import moment from "moment";

// https://picmojs.com/
import { lightTheme, darkTheme } from 'picmo';
import { createPopup } from "@picmo/popup-picker";
</script>

<template>
  <!-- TODO: divide chatComponent into further components -->
  <!-- TODO: use em instead of rem where appropriate -->
  <!-- TODO: find better icons cuz fontawesome icons suck -->
  <!-- TODO: listen/emit some event -->
  <!-- TODO: use localStorage/sessionStorage for saving settings and chats -->
  <!-- TODO: move users.json to /public/data/ -->
  <div
    id="chat"
    :class="darkMode ? 'dark' : ''"
    @someEvent="actionForSomeEvent"
  >
    <div id="chatSelectContainer">
      <!-- + 1 needed to compensate for currently logged in user -->
      <div v-if="ableToOpenNewChat" id="openNewChat">
        <input
          v-if="!showNewChatSection"
          class="btn btn-success"
          type="button"
          value="New Chat"
          @click="showNewChatSection = true"
        />
        <template v-else>
          <input
            class="btn btn-danger"
            type="button"
            value="Close"
            @click="showNewChatSection = false"
          />
          <!-- Filter users to exclude currently logged in user -->

          <ul id="openNewChatUsersList" class="list-group" data-bs-theme="dark">
            <li
              v-for="(user, index) in users.filter(
                (user) =>
                  user.userName !== loggedInUser.userName &&
                  !openChatsUsernames.includes(user.userName)
              )"
              :key="index"
              class="list-group-item openNewChatUser"
              @click="openChat(user.userName)"
            >
              <span style="font-weight: bold">{{
                getUserShortName(user.userName)
              }}</span>
              <span>{{ user.userName }}</span>

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
        v-for="(chat, index) in loggedInUser.chats"
        :key="index"
        :class="
          chat.userName === activeChatUser?.userName
            ? 'chatSelect selected'
            : 'chatSelect'
        "
        :style="index === 0 ? 'margin-top: 0.2rem;' : ''"
        @click="openChat(chat.userName)"
      >
        <!-- @click.stop="openUserProfile(chat.userName)" -->
        <img :src="getUser(chat.userName).avatar" alt="avatar" class="avatar" draggable="false"/>
        <div id="nameAndLastMessageContainer">
          <p class="shortName">
            {{ getUserShortName(chat.userName) }}
          </p>
          <div v-if="chat.messages.length" class="lastMessage">
              <font-awesome-icon
                v-if="chat.messages[chat.messages.length - 1].type === 'sent'"
                icon="fa-regular fa-circle-up"
              />
              <font-awesome-icon v-else icon="fa-regular fa-circle-down" />

            <p>
              {{ chat.messages[chat.messages.length - 1].message }}
            </p>
          </div>
        </div>
        <!-- <div id="chatSelectContainerOptions">
          </div> -->
      </div>
      <div v-if="!loggedInUser.chats.length" id="noOpenChats">
        <p>You don't have any open chats...</p>
      </div>
    </div>

    <!-- Using v-show instead of v-if due to emoji library needing container to always be in DOM -->
    <div v-show="activeChatUser !== null" id="activeChatContainer">
      <div id="activeChatTopContainer">
        <div id="activeChatNameContainer">
          <p @click="openUserProfile(activeChatUser.userName)">
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
            class="clickableIconContainer"
            @click="showActiveChatSettings = !showActiveChatSettings"
          >
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
          </div>
        </div>
      </div>
      <div v-if="showActiveChatSettings" id="activeChatSettings">
        <div
          class="clickableIconContainer"
          @click.stop="openUserProfile(activeChatUser.userName)"
        >
          <font-awesome-icon icon="fa-regular fa-user" />
        </div>

        <div
          class="clickableIconContainer"
          style="color: red"
          @click.stop="deleteChat(activeChatUser.userName)"
        >
          <font-awesome-icon icon="fa-solid fa-trash-can" />
        </div>

        <div class="clickableIconContainer" @click.stop="toggleDarkMode">
          <font-awesome-icon icon="fa-solid fa-sun" />
        </div>
      </div>
      <div id="activeChatMessagesContainer">
        <div
          v-for="(message, index) in loggedInUser.chats.find(
            (chat) => chat.userName === activeChatUser?.userName
          )?.messages"
          :key="index"
          :class="'chatMessage ' + message.type"
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
            id="messageInput"
            v-model="chatMessageInput"
            class="form-control"
            placeholder="Message..."
            type="text"
          />
          <div id="chatInputButtons">
            <div id="emojiBtn" class="clickableIconContainer">
              <font-awesome-icon icon="fa-solid fa-face-smile" />
            </div>

            <div
              id="sendBtn"
              class="clickableIconContainer"
              @click="sendMessage"
            >
              <font-awesome-icon icon="fa-solid fa-paper-plane" />
            </div>
          </div>
        </form>
      </div>
      <div
        id="activeChatProfileInfo"
        v-if="showActiveChatProfileInfo && activeChatUser !== null"
      >
        <div id="activeChatProfileInfoImageContainer">
          <img
            :src="getUser(activeChatUser.userName).avatar"
            alt="avatar"
            class="avatar"
            draggable="false"
          />
          <p class="fullName">
            {{ activeChatUser.firstName }} {{ activeChatUser.lastName }}
          </p>
        </div>

        <ul id="activeChatProfileInfoDetailsContainer">
          <li><span class="infoType">@</span>{{ activeChatUser.userName }}</li>
          <div id="ageAndGenderContainer"><li><span class="infoType">Age</span> {{ activeChatUser.age }}</li>
          <li><span class="infoType">Gender</span> {{ activeChatUser.gender }}</li></div>
          <li><span class="infoType">About</span> {{ activeChatUser.description }}</li>
          <li><span class="infoType">Member since</span> {{ activeChatUser.signupDate }}</li>
        </ul>
        <div class="clickableIconContainer" id="activeChatProfileInfoCloseBtn" @click="openUserProfile(activeChatUser.userName)">
        <font-awesome-icon icon="fa-regular fa-circle-xmark" />
      </div>
      </div>

    </div>
    <div v-show="activeChatUser === null" id="emptyActiveChatContainer">
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
      // TODO: replace this with actual logged in user, get it from vue store
      loggedInUser: users[0],
      chatMessageInput: "",
      showNewChatSection: false,
      showActiveChatProfileInfo: false,
      // TODO: replace this with colors from from vue store
      bodyBgColor: "#ffe1e8",
      bodyDarkModeBgColor: "#8843e4",
     // TODO: replace this with actual dark mode status from vue store
      darkMode: true,
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
        this.showActiveChatProfileInfo = false;
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
        this.scrollToLastMessage();
        this.scrollToFirstChatSelectUser();
        this.showActiveChatProfileInfo = false;
      }
    },
    openUserProfile(userName) {
      // TODO: redirect to user profile page
      // toggle
      this.showActiveChatProfileInfo = !this.showActiveChatProfileInfo;
      this.showActiveChatSettings = false;
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
    scrollToFirstChatSelectUser() {
      // Scroll down to last message
      // $nextTick is called after v-for has rendered all chatMessages
      this.$nextTick(() => {
        const container = document.querySelector("#chatSelectContainer");
        if (container) {
          container.scrollTop = 0;
        }
      });
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    getUserShortName(userName) {
      const user = getUser(userName);
      return `${user.firstName} ${user.lastName.charAt(0)}.`;
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
    darkMode(status) {
      const body = document.querySelector('body')
      body.style.background = this.darkMode ? this.bodyDarkModeBgColor : this.bodyBgColor;
    },
  },
  computed: {
    // get an array of usernames of all open chats
    openChatsUsernames() {
      return this.loggedInUser.chats.map((chat) => chat.userName);
    },
    ableToOpenNewChat() {
      return this.openChatsUsernames.length + 1 !== users.length;
    },
  },
  created() {
    const body = document.querySelector('body')
    body.style.background = this.darkMode ? this.bodyDarkModeBgColor : this.bodyBgColor;

    if (this.openLastChatOnLoad && this.loggedInUser.chats.length) {

      this.openChat(this.loggedInUser.chats[0].userName)
    }


  },
  mounted() {
    /*// The picker must have a root element to insert itself into
    const rootElement = document.querySelector('#emojiBtn');

// Create the picker
    const picker = createPicker({ rootElement });

// The picker emits an event when an emoji is selected. Do with it as you will!
    picker.addEventListener('emoji:select', event => {
      console.log('Emoji selected:', event.emoji);
    });
*/


    const trigger = document.querySelector('#emojiBtn');

    const picker = createPopup({
     theme: darkTheme,
      onPositionLost: 'close',
      hideOnEmojiSelect: false,
      emojiSize: '2rem',
      position: 'top-end',
      showSearch: true,
      showCategoryTabs: false,
      showRecents: false,
      showPreview: false,
      showVariants: false,
      animate: false,
      emojisPerRow: 6,
      categories: ['smileys-emotion', 'people-body', 'animals-nature']
    }, {
      referenceElement: trigger,
      triggerElement: trigger
    });

    trigger.addEventListener('click', () =>  picker.toggle())
    picker.addEventListener('emoji:select', (data) => this.chatMessageInput += data.emoji)

  },
  props: {
    openLastChatOnLoad: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: []
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
  --textColor: #000;
  --bgColor: #fff;
  --iconHoverColor: #3c008d;
  --scrollBarColor: rgba(0, 0, 0, 0.9);
  --scrollBarTrackColor: inset 0 0 6px rgba(136, 136, 136, 0.9);
  --lastMessageColor: #282828;
  --messageInputBg: #fff;
  --messageInputColor: #000;
  --messageInputPlaceholderColor: #555;
  --lastMessageIconColor: #1b7200;
  --profileInfoTypeColor: #003bbf;

  border-radius: 10px;
  background: var(--bgColor);
  color: var(--textColor);
  gap: 1rem;
  min-height: 60vh;
  max-height: 70vh;
  max-width: 80rem;
  min-width: fit-content;

  display: flex;

  padding: 1rem;
  margin: 0 auto;
  box-shadow: 0 0 20px 3px #000000;
}

#chat.dark {
  --textColor: #fff;
  --bgColor: #000;
  --iconHoverColor: #b37aff;
  --scrollBarColor: rgba(255, 255, 255, 0.4);
  --scrollBarTrackColor: inset 0 0 6px rgba(148, 103, 103, 0.9);
  --lastMessageColor: #d5d5d5;
  --messageInputBg: #323232;
  --messageInputColor: #fff;
  --messageInputPlaceholderColor: #d7d7d7;
  --lastMessageIconColor: #2bb302;
  --profileInfoTypeColor: #00c4ff;

  box-shadow: 0 0 20px 3px #ffffff;;
}

/*#activeChatTopContainer,
#chatSelectContainer*/
#chat {
  /* prevent unwanted dragging and text selection */

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

#activeChatContainer {
  width: 100%;
  /* SEPARATOR */
  /*
  background-image: linear-gradient(#80008070, #80008070);
background-repeat: no-repeat;
  background-size: 1px 70%, calc(100% - 4px) 100%;
  background-position: left center, 4px 0;

   */
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
  padding: 0 0 2rem 0;
  margin-top: 1rem;
}

#chatSelectContainer {
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  /*border: 0.1rem solid red;*/
  border-radius: 10px;

  box-shadow: 0rem 0rem 8px 0px #9b9b9b;

  grid-area: chatSelectContainer;

  overflow-y: auto;

  padding: 0 0.2rem;
}

#chatSelectContainer::-webkit-scrollbar, #openNewChatUsersList::-webkit-scrollbar, #activeChatProfileInfo::-webkit-scrollbar {
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
  /* to prevent elements from moving on hover */
  border: 0.1rem solid transparent;
  /*transition: .1s;*/
}

.chatSelect:hover {
  background-color: #32323269;
}

#nameAndLastMessageContainer {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-content: center;
  text-align: center;
  max-width: 7rem;
  width: 100%;
}

.shortName {
  font-weight: bold;
  text-align: center;
  font-size: 1.3em;
  color: #230038;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#chat.dark .shortName {
  color: #ffffff;
}

#activeChatMessagesContainer::-webkit-scrollbar {
  width: 0.3em;
  border-radius: 10px;
}

#activeChatMessagesContainer::-webkit-scrollbar-track {
  box-shadow: var(--scrollBarTrackColor);
  border-radius: 10px;
}

#activeChatMessagesContainer::-webkit-scrollbar-thumb {
  background-color: var(--scrollBarColor);
  border-radius: 10px;
}

#chatSelectContainer > .chatSelect.selected {
  border: 0.1rem solid #8843e4;
  background: rgb(136 67 228 / 50%);
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

.lastMessage {
  color: var(--lastMessageIconColor);
  font-size: 1.2em;
}

.lastMessage p {
  display: inline;
  color: var(--lastMessageColor);
  font-size: 1em;
  margin-left: 0.3rem;
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

.chatSelect .avatar {
  border-radius: 50%;
  height: 5rem;
  border: 0.15rem solid rgb(255 134 134);
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
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: var(--bgColor);
  color: var(--textColor);
}

.openNewChatUser:hover {
  background-color: #32323269;
}

#openNewChat {
  margin: 0;
  padding: 1em 0 0.8em 0;
}

#openNewChat input {
  display: block;
  margin: 0 auto;
}

#activeChatTopContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem 1rem 1rem 0;
}

.activeChatStatus {
  font-size: 0.6em;
  margin-top: 0.3rem;
}

.clickableIconContainer {
  font-size: 2.3em;
  margin: auto 0;
  cursor: pointer;
  display: inline;
  min-width: 2rem;
  text-align: center;
}

.clickableIconContainer:hover {
  color: var(--iconHoverColor);
}

#messageInput {
  border: 0.15rem solid #8b8b8b;
  border-radius: 10px;
  background: var(--messageInputBg);
  font-size: 1.2em;
  font-weight: 500;
  color: var(--messageInputColor);
}

#messageInput::placeholder {
  color: var(--messageInputPlaceholderColor);
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
  transition: .2s;
}

#activeChatNameContainer:hover {
  font-size: 2.6em;
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
  display: flex;
  gap: 2rem;
  width: fit-content;
  margin-left: auto;
  margin-bottom: 1rem;
  grid-area: activeChatSettings;
  padding: 1em 2em;
  border: 0.1rem solid var(--textColor);
  border-radius: 10px;
}

#openNewChatUsersList {
  margin-top: 1rem;
  max-height: 20rem;
  overflow: auto;
  text-align: center;
}

#emptyActiveChatContainer {
  border: 0.2rem solid purple;
  border-radius: 10px;
  margin: auto;
  font-size: 2em;
}

#emptyActiveChatContainer p {
  position: relative;
  padding: 2rem;
  text-align: center;
}

#noOpenChats {
  text-align: center;
}

#activeChatProfileInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem 2rem;
  padding: 1rem 1rem 0 1rem;
  background: rgb(128 0 128 / 10%);
  backdrop-filter: blur(40px);
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px 0px magenta;
  grid-area: activeChatMessagesContainer;

  /* needed to hide activeChatMessagesContainer scrollbar */
  width: 102%;
  transform: translateX(-1%);

  font-weight: 500;
  font-size: 1.1em;

  overflow: auto;
}

#activeChatProfileInfoImageContainer {
  text-align: center;
  margin: auto 0;
  /* Fixed width to compensate for .avatar:hover extra width */
  width: 13rem;
}

#activeChatProfileInfoDetailsContainer {
  margin: auto 0;
  list-style: none;
  padding: 0;
  max-width: 30rem;
}

#activeChatProfileInfo .avatar {
  border-radius: 50%;
  margin-bottom: 1rem;
  height: 10em;
  border: 0.2rem solid var(--bgColor );
  box-shadow: 0 0 20px 0px var(--textColor);
  transition: .15s;
}

#activeChatProfileInfo .avatar:hover {
  height: 11em;
}

#activeChatProfileInfo .fullaName {
  font-weight: bold;
  font-size: 1.6em;
  text-align: center;
  color: #230038;
  overflow: hidden;
}

#chat.dark .fullName {
  color: #ffffff;
}


#activeChatProfileInfoDetailsContainer li {
  border-radius: 10px;
  background: #e1c9ff;
  margin: 0.4em 0;
  padding: 0.7rem 1rem;
  border: 0.1rem solid var(--textColor);
  max-width: 22rem;
  white-space: break-spaces;
}

#activeChatProfileInfoDetailsContainer li:hover {
  background: #d1adff;
}

.dark #activeChatProfileInfoDetailsContainer li {
  background: #190019;
}

.dark #activeChatProfileInfoDetailsContainer li:hover {
  background: #2a002a;
}



#activeChatProfileInfoDetailsContainer .infoType {
  font-weight: bold;
  color: var(--profileInfoTypeColor);
  margin-right: 0.2em;
}

#activeChatProfileInfoCloseBtn {
  position: absolute;
  right: 1.5rem;
  top: 1rem;
}

#ageAndGenderContainer {
  margin: 1rem 0;
  width: max-content;
}


#ageAndGenderContainer li {
  display: inline;
  margin-right: .5em;
}

.openNewChatUser span {
  display: block;
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
    min-width: fit-content;
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

  #activeChatProfileInfo {
    flex-direction: column;
    justify-content: unset;
  }

  #activeChatProfileInfo li {
    font-size: clamp(1em, 3vw, 1.4em);
  }
}

@media (max-width: 600px) {
  #chat {
    gap: 0.25rem;
    min-height: 50vh;
    max-height: 60vh;
    max-width: 80rem;

    margin: 0 0.5rem;

    padding: 0.2rem;
    font-size: clamp(0.6rem, 2vw, 0.8rem);
  }

 /* #chatSelectContainer {
    min-width: 7rem;
  } */

  #callIconsContainer {
    gap: 0.5rem;
  }

  #activeChatContainer {
    padding: 0 0.5rem;
  }

  #emptyActiveChatContainer {
    font-size: 2em;
  }

  #emptyActiveChatContainer p {
    padding: 1rem;
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

  .openNewChatUser {
    padding: 0.5rem 0.1rem;
  }

  .chatSelect .avatar {
    height: 4rem;
  }

  #activeChatSettings {
    gap: 0.2rem;
    padding: 0.8em 0.8em;
  }

  #activeChatProfileInfo ul{
    max-width: 20rem;
  }
}
</style>

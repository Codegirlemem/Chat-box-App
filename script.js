// Open and close chat box
const main = document.querySelector("main");
const openChatBox = document.querySelector("#open-chatbox-btn");

function toggleChatBox() {
  main.classList.toggle("open");
}

openChatBox.addEventListener("click", toggleChatBox);

// Initiating chat

// chat box
const chatBox = document.querySelector("#chat-box");

// chat box body section where messages are displayed
const chatBoxBody = document.querySelector(".chatbox-body");
chatBoxBody.scrollTop = chatBoxBody.scrollHeight;

// chat box unordered list where the lists will be added
const ChatBoxLists = document.querySelector(".chatbox-lists");

// Function which creates the list element and its children and append it to the unordered list on the chat body
function appendChat(message, className, responseArr) {
  // creates the li
  const chat = document.createElement("li");

  // creates the msg-box div
  const msgBox = document.createElement("div");

  // creates the avatar div
  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  const avatarSpan = document.createElement("span");
  let avatarImg = document.createElement("img");

  // creates the para p that displays the messages and adds the para class to it
  const para = document.createElement("p");
  para.classList.add("para");
  para.innerHTML = message;

  const timeStamp = document.createElement("p");

  // adds the para p inside the message box div

  if (className === "user") {
    chat.classList.add("chat", className);
    msgBox.classList.add("msg-box", "user-msg");
    if (
      message === userMsg[2] ||
      (responseArr.length >= 2 && message === responseArr[2])
    ) {
      timeStamp.textContent = `Just now・Not seen yet`;
      msgBox.append(para, timeStamp);
    } else {
      msgBox.appendChild(para);
    }
    chat.appendChild(msgBox);
  } else if (className === "bot") {
    if (message === botMsg[1]) {
      chat.classList.add("chat", className, "human");
      msgBox.classList.add("msg-box", "bot-msg", "human-msg");
      avatarSpan.classList.add("human-img");
      avatarImg.setAttribute("src", "./images/human.svg");
      timeStamp.textContent = `Hannah・Just now`;
      msgBox.append(para, timeStamp);
    } else {
      chat.classList.add("chat", className);
      avatarImg.setAttribute("src", "./images/bot.svg");
      msgBox.classList.add("msg-box", "bot-msg");
      msgBox.appendChild(para);
    }

    avatarSpan.appendChild(avatarImg);
    avatar.appendChild(avatarSpan);

    chat.append(avatar, msgBox);
  }

  ChatBoxLists.appendChild(chat);
}

// Messages to display on the chat
const humanResp1 = "<span>Hi there! I'm Hannah.</span>";
const humanResp2 = "<br /> ";
const humanResp3 = "<br /> ";
const humanResp4 = "<br /> ";
const humanResp5 = "<span>How can I help?</span>";

const humanResp =
  humanResp1 + humanResp2 + humanResp3 + humanResp4 + humanResp5;

let userMsgs = [
  `i'm sorry bot, but you're wrong`,
  `can i talk to someone please?`,
  `oh finally a human, wohoo!`,
];

let userMsg = userMsgs.map((arr) => {
  return arr.toLowerCase();
});

let botMsg = [
  `No problem! Let me connect you to a customer support agent.`,
  humanResp,
  `What can I do for you?`,
  "I will resolve it shortly",
  `I'm on it.`,
  `Alright`,
  `Is that all?`,
];

// function to display bot messages
let count = 2;
function showBotResponse(botArrs, className, responseArr, userInput) {
  if (responseArr.indexOf(userInput) <= 1) {
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        setTimeout(() => {
          appendChat(botArrs[i], className, responseArr);
        }, 1000 * i);
      }
    }, 600);
  } else {
    setTimeout(() => {
      appendChat(botArrs[count], className, responseArr);
    }, 600);

    setTimeout(() => {
      count = (count + 1) % botArrs.length;
    }, 700);
    return;
  }
  return;
}

// function to display both user and both messages
function chatEvent(botMsg, userInput, responseArr, userMsg) {
  if (userInput === userMsg[1]) {
    appendChat(userInput, "user", responseArr);
    showBotResponse(botMsg, "bot", responseArr, userInput);
  } else if (
    userInputArr.indexOf(userInput) === 0 ||
    userInputArr.indexOf(userInput) === 2 ||
    userInput === userMsg[0] ||
    userInput === userMsg[2]
  ) {
    appendChat(userInput, "user", responseArr);
  } else {
    appendChat(userInput, "user", responseArr);
    showBotResponse(botMsg, "bot", responseArr, userInput);
  }
  return;
}

// form element
const chatBoxForm = document.querySelector(".chatbox-form");

// input element
const inputMessage = document.querySelector("#input-message");

// event listening function on sending the user input
let userInputArr = [];

const showChat = (e) => {
  e.preventDefault();
  let userInput = inputMessage.value.trim();
  userInputArr.push(userInput.toLowerCase());
  console.log(userInputArr);
  console.log(userInputArr.indexOf(userInput));
  console.log(userInput);
  chatEvent(botMsg, userInput, userInputArr, userMsg);

  inputMessage.value = "";
};

chatBoxForm.addEventListener("submit", showChat);
// inputMessage.addEventListener("keydown", showChat);

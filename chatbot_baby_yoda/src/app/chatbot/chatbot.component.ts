import { Component, Input } from '@angular/core';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

  @Input() public messageToSave: string;
  public allMessages: Message[];
  public outputMessages: string[];
  public responseFlag: boolean;

  constructor() {
    this.messageToSave = '';
    this.allMessages = [{ sender: 'bot', text: "Hello.. I'm listening! Go on.." }];
    this.outputMessages = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    this.responseFlag = false;
  }

  chatBotFlow() {
    this.showUserMessage();
    if (this.responseFlag) {
      this.getChatbotMessage();
    }
  }

  showUserMessage() {
    this.allMessages.push({ sender: 'user', text: this.messageToSave });
    this.messageToSave = '';
    this.responseFlag = true;
  }

  getChatbotMessage() {
    if (this.outputMessages.length > 0) {
      this.allMessages.push({ sender: 'bot', text: this.outputMessages.shift()! });
    }
    this.responseFlag = false;
  }
}

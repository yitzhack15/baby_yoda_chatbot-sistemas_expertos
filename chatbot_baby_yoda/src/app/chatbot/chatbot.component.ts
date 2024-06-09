import { Component, Input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewChecked {

  @Input() public messageToSave: string;
  public allMessages: Message[];
  public outputMessages: string[];
  public responseFlag: boolean;

  @ViewChild('messageSection') private messageSection!: ElementRef;

  constructor() {
    this.messageToSave = '';
    this.allMessages = [{ sender: 'bot', text: "Hello.. I'm listening! Go on.." }];
    this.outputMessages = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    this.responseFlag = false;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messageSection.nativeElement.scrollTop = this.messageSection.nativeElement.scrollHeight;
    } catch(err) { 
      console.error('Scroll to bottom failed:', err);
    }
  }

  chatBotFlow() {
    this.showUserMessage();
    if (this.responseFlag) {
      this.getChatbotMessage();
    }
  }

  showUserMessage() {
    if(this.messageToSave != ''){
      this.allMessages.push({ sender: 'user', text: this.messageToSave });
      this.messageToSave = '';
      this.responseFlag = true;
    }
    else
      alert('Please write a valid message on the input field.');
  }

  getChatbotMessage() {
    if (this.outputMessages.length > 0) {
      this.allMessages.push({ sender: 'bot', text: this.outputMessages.shift()! });
    }
    this.responseFlag = false;
  }

  onEnter() {
    this.chatBotFlow();
  }
}

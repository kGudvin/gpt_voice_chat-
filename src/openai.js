import axios from 'axios';
import config from 'config';
import { createReadStream } from 'fs';
import OpenAI from "openai";

const myApiKey = "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";

class myOpenAI {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  };

  constructor(apiKey) {
    // Assign the OpenAI instance to a class property
    this.openai = new OpenAI({ apiKey });
  }

  async chat(messages) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages
      });
      if (response && response.choices && response.choices.length > 0) {
        const reply = response.choices[0].message.content.trim();
        return reply;
      } else {
        console.error('Invalid or empty response from OpenAI API');
        return 'Error: Invalid or empty response';
      }
    } catch (error) {
      console.error("Error while gpt chat", error.message);
      return 'Error: Unable to process chat';
    }
  }
  
  async transcription(filepath) {
    try {
      const transcription = await this.openai.audio.transcriptions.create({
        file: createReadStream(filepath),
        model: "whisper-1",
      });
      return transcription.text
    } catch (e) {
      console.log('Error while transcription', e.message);
    }
  }
}

// Instantiate myOpenAI with the actual API key value
export const openai = new myOpenAI(myApiKey);
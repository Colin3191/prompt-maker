export class OpenAIClient {
  private apiKey: string;
  private baseUrl = "https://api.openai.com/v1/chat/completions";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeImage(imageBase64: string, prompt: string): Promise<string> {
    const requestData = {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
              },
            },
          ],
        },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    };

    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Unexpected response format from OpenAI API");
    }
  }
}
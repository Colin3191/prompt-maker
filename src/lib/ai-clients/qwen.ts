export class QwenClient {
  private apiKey: string;
  private baseUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeImage(imageBase64: string, prompt: string): Promise<string> {
    const requestData = {
      model: "qwen-vl-max-latest",
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
      top_p: 0.8,
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
      throw new Error(`Qwen API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error("Unexpected response format from Qwen API");
    }
  }
}
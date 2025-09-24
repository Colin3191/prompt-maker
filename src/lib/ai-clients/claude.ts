export class ClaudeClient {
  private apiKey: string;
  private baseUrl = "https://api.anthropic.com/v1/messages";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeImage(imageBase64: string, prompt: string): Promise<string> {
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    const mediaType = imageBase64.match(/data:([^;]+);/)?.[1] || 'image/jpeg';

    const requestData = {
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64Data,
              },
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    };

    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Claude API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.content && data.content.length > 0) {
      return data.content[0].text;
    } else {
      throw new Error("Unexpected response format from Claude API");
    }
  }
}
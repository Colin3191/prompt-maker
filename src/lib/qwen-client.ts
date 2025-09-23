// 通义千问 API 客户端
export interface QwenVisionRequest {
  model: string;
  input: {
    messages: Array<{
      role: "system" | "user" | "assistant";
      content: Array<{
        text?: string;
        image?: string;
      }>;
    }>;
  };
  parameters?: {
    result_format?: "text" | "message";
    seed?: number;
    max_tokens?: number;
    top_p?: number;
    top_k?: number;
    repetition_penalty?: number;
    temperature?: number;
    stop?: string[];
    incremental_output?: boolean;
    tools?: unknown[];
  };
}

export interface QwenVisionResponse {
  output: {
    text?: string;
    finish_reason?: string;
    choices?: Array<{
      finish_reason: string;
      message: {
        role: string;
        content: string;
      };
    }>;
  };
  usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
  request_id: string;
}

export class QwenClient {
  private apiKey: string;
  private baseUrl =
    "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeImage(imageBase64: string, prompt: string): Promise<string> {
    const requestData = {
      model: "qwen-max",
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

export function createQwenClient(apiKey?: string): QwenClient | null {
  if (!apiKey) {
    return null;
  }
  return new QwenClient(apiKey);
}

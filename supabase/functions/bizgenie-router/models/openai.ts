
// Define model constants
export const MODEL_O1_MINI = 'gpt-4o-mini';  // Lightweight model
export const MODEL_O3_MINI_HIGH = 'gpt-4o';   // Balanced model
export const MODEL_GPT4 = 'gpt-4o';         // Advanced model

interface CallOpenAIParams {
  model: string;
  systemPrompt: string;
  userMessage: string;
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
}

export async function callOpenAI({
  model,
  systemPrompt,
  userMessage,
  apiKey,
  temperature = 0.7,
  maxTokens = 2048
}: CallOpenAIParams) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: temperature,
        max_tokens: maxTokens
      })
    });

    return await response.json();
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
}

// Calculate estimated cost based on token usage and model
export function calculateCost(tokens: number, model: string): number {
  if (model === MODEL_O1_MINI) {
    return tokens * 0.00001; // $0.01 per 1000 tokens
  } else if (model === MODEL_O3_MINI_HIGH) {
    return tokens * 0.00003; // $0.03 per 1000 tokens
  } else if (model === MODEL_GPT4) {
    return tokens * 0.00006; // $0.06 per 1000 tokens
  }
  return 0;
}

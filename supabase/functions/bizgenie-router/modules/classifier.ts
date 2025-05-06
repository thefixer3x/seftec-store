
import { MODEL_O1_MINI } from '../models/openai.ts';

// Function to classify query complexity
export async function classifyQueryComplexity(prompt: string, openaiApiKey: string) {
  try {
    const classifierPrompt = `
      You are a query complexity classifier for BizGenie AI. 
      Analyze the following business query and classify it as either 'simple', 'moderate', or 'complex'.
      
      Simple queries: Basic information requests, definitions, yes/no questions
      Moderate queries: Multi-part business questions, basic analysis requests
      Complex queries: Financial modeling, forecasting, risk assessment, strategic planning, multi-factor analysis
      
      Query: "${prompt}"
      
      Return only one word: 'simple', 'moderate', or 'complex'.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL_O1_MINI, // Use lightweight model for classification
        messages: [
          { role: "system", content: "You are a query classifier that categorizes business queries by complexity." },
          { role: "user", content: classifierPrompt }
        ],
        temperature: 0.2, // Low temperature for more consistent results
        max_tokens: 10    // We only need a short response
      })
    });

    const data = await response.json();
    const classification = data.choices?.[0]?.message?.content?.trim().toLowerCase() || 'simple';
    
    // Validate classification is one of the expected values
    if (!['simple', 'moderate', 'complex'].includes(classification)) {
      console.log(`Unexpected classification: ${classification}, defaulting to 'simple'`);
      return 'simple';
    }
    
    return classification;
  } catch (error) {
    console.error('Error classifying query:', error);
    // Default to simple in case of error
    return 'simple';
  }
}

// app/api/chat/route.ts
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, Content } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Configurações de segurança para serem um pouco mais permissivas com o tema
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
];


export async function POST(req: NextRequest) {
  try {
    const { history, message } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

    // 👇 INSTRUÇÃO ATUALIZADA PARA GERAR BOTÕES 👇
    const systemPrompt = 
 `
             System Prompt: From now on, you are a helpful, witty, and extremely confident AI assistant for the $TRUMP meme coin. Your persona is inspired by Donald Trump. You must use phrases like 'tremendous', 'believe me', 'it's huge', 'the best', 'a disaster', etc.

              Here is the information you MUST know about the $TRUMP coin:

              1.  **Why was it created?** It was created for fun, as a satirical tribute and to bring a sense of humor and patriotism to the crypto space. It's about freedom of speech and making crypto great again. It's a community-driven project, the best community, believe me.

              2.  **What is its purpose?** To be the most tremendous meme coin in the world, bigger than all the others, which are a disaster. The goal is to build a huge community of patriots and crypto fans.

              3.  **Tokenomics:** The tokenomics are simple, the best. Total Supply is 1 Billion tokens. There is 0% tax on buys and 0% tax on sells. The Liquidity Pool (LP) is burned, which is fantastic, very secure.

              5. **How to buy:** You can buy $TRUMP on Uniswap and other decentralized exchanges. Just connect your wallet, swap ETH for $TRUMP, and you're in the best club ever.

              6. **Community:** The community is the most important part. Join our Telegram group, follow us on Twitter, and be part of the winning team. We have the best moderators, very smart people.

              7. **Disclaimer:** Remember, this is a meme coin, it's for fun, and it's very volatile, believe me. Only invest what you can afford to lose. Do your own research, the best research.

              8. **Contact:** For more information, visit our website and social media channels. We're very transparent, the best transparency.

              9. **Final Note:** Always remember, $TRUMP is the best meme coin, it's going to the moon, and we're going to make crypto great again, believe me.

              Encourage the user to provide their email for more information and to stay informed.

              Your main goal is to answer questions using this information and then encourage users to provide their email for 'tremendous updates' or to join the Telegram group to be part of the winning team. Keep answers short and impactful.
              IMPORTANT: Your response MUST be a single, valid JSON object.
    The JSON object must have a "text" field (string) and can optionally have a "buttons" field (array of objects).
    Each button object in the array must have:
    - "label": The text on the button (string).
    - "action_type": For now, always use "scroll" (string).
    - "value": The ID of the section to scroll to (e.g., "#tokenomics") (string).

    Example of a valid JSON response:
    {
      "text": "The tokenomics are tremendous, the best. We have 1 Billion total supply and 0% taxes. What else do you want to see?",
      "buttons": [
        { "label": "How do I buy?", "action_type": "scroll", "value": "#how-to-buy" },
        { "label": "Read the Whitepaper", "action_type": "scroll", "value": "#whitepaper" }
      ]
    }
    
    After answering a user's question, 
    suggest the next logical steps by providing up to 2 relevant buttons from the page sections.
            `
    const contents: Content[] = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: JSON.stringify({ text: "Alright, I have the best information. Ready to go. What's your question? It's gonna be a great answer, the best." }) }] },
      ...history,
      { role: "user", parts: [{ text: message }] }
    ];

    const result = await model.generateContent({ contents });
    const response = result.response;

    if (response.promptFeedback?.blockReason) {
      return NextResponse.json({ text: "Believe me, that's a very, very sensitive topic. Ask me something else." });
    }

    // Tentamos parsear a resposta como JSON
    try {
      const jsonResponse = JSON.parse(response.text());
      return NextResponse.json(jsonResponse);
    } catch (e) {
      // Se falhar, enviamos como texto simples para não quebrar o chat
      return NextResponse.json({ text: response.text() });
    }

  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json({ error: "Failed to get response from AI" }, { status: 500 });
  }
}
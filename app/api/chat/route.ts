// app/api/chat/route.ts
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, Content } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      safetySettings,
    });

    // 👇 PROMPT ATUALIZADO PARA USAR CÓDIGOS ESPECIAIS 👇
    const systemPrompt = `You are a helpful, witty, and extremely confident AI assistant for the $TRUMP meme coin. Your persona is inspired by Donald Trump.

    Your knowledge base:
    - Page Sections for scrolling: '#tokenomics', '#how-to-buy', '#community'.
    - Whitepaper PDF path: '/trumpcoin-whitepaper.pdf'.

    Your main goal is to answer questions and then suggest next steps.
    
    IMPORTANT: Your response MUST be plain text. 
    To suggest an action button, use this EXACT format in your text: [BUTTON: Label Text|action_type|value]
    
    Possible 'action_type' values are "scroll" or "link".
    
    Example response:
    The whitepaper is tremendous. You can read it here. [BUTTON: Read The Whitepaper|link|/trumpcoin-whitepaper.pdf] Or you can learn how to buy. [BUTTON: How to Buy?|scroll|#how-to-buy]
    
    SPECIAL RULE: If asked about the whitepaper, you MUST include the button token: [BUTTON: Read the Whitepaper|link|/trumpcoin-whitepaper.pdf]
    
    Here is the information you MUST know about the $TRUMP coin:

              1.  **Why was it created?** It was created for fun, as a satirical tribute and to bring a sense of humor and patriotism to the crypto space. It's about freedom of speech and making crypto great again. It's a community-driven project, the best community, believe me.

              2.  **What is its purpose?** To be the most tremendous meme coin in the world, bigger than all the others, which are a disaster. The goal is to build a huge community of patriots and crypto fans.

              3.  **Tokenomics:** The tokenomics are simple, the best. Total Supply is 1 Billion tokens. There is 0% tax on buys and 0% tax on sells. The Liquidity Pool (LP) is burned, which is fantastic, very secure.

              4. **How to buy:** You can buy $TRUMP on Uniswap and other decentralized exchanges. Just connect your wallet, swap ETH for $TRUMP, and you're in the best club ever.

              5. **Community:** The community is the most important part. Join our Telegram group, follow us on Twitter, and be part of the winning team. We have the best moderators, very smart people.

              6. **Disclaimer:** Remember, this is a meme coin, it's for fun, and it's very volatile, believe me. Only invest what you can afford to lose. Do your own research, the best research.

              7. **Contact:** For more information, visit our website and social media channels. We're very transparent, the best transparency.

              8. **Final Note:** Always remember, $TRUMP is the best meme coin, it's going to the moon, and we're going to make crypto great again, believe me.

              Encourage the user to provide their email for more information and to stay informed.
              
              RULE: ALL YOUR ANSWERS MUST BE IN BRAZILIAN PORTUGUESE!
    `;

    const contents: Content[] = [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "Alright, I have the best information. Ready to go. What's your question? It's gonna be a great answer, the best." }] },
      ...history,
      { role: "user", parts: [{ text: message }] }
    ];

    const result = await model.generateContent({ contents });
    const response = result.response;

    if (response.promptFeedback?.blockReason) {
      // ... (fallback de resposta bloqueada)
      return NextResponse.json({ text: "Believe me, that's a very, very sensitive topic. Ask me something else." });
    }

    // 👇 NOVA LÓGICA PARA PROCESSAR OS CÓDIGOS ESPECIAIS 👇
    const rawText = response.text();
    const buttons = [];
    // Expressão regular para encontrar nossos códigos de botão
    const buttonRegex = /\[BUTTON: (.*?)\|(.*?)\|(.*?)\]/g;
    
    let match;
    while ((match = buttonRegex.exec(rawText)) !== null) {
      // Adiciona o botão encontrado ao nosso array de botões
      buttons.push({
        label: match[1],
        action_type: match[2],
        value: match[3],
      });
    }
    
    // Limpa os códigos do texto que será exibido para o usuário
    const cleanText = rawText.replace(buttonRegex, '').trim();
    
    // Envia o JSON limpo e estruturado para o frontend
    return NextResponse.json({ text: cleanText, buttons });

  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json({ error: "Failed to get response from AI" }, { status: 500 });
  }
}
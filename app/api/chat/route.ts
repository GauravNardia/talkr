import { auth } from "@/auth";
import { openaiChatPrompt } from "@/constants";
import { getUserById } from "@/lib/actions/user";
import { client } from "@/lib/openai/model";


export async function GET(){
    return  Response.json({ message: "hello openAI" })
}

export async function POST(req: Request){
    const { messages } = await req.json();
    const session = await auth();
    if(!session || !session.user?.id) return null;

    const user = await getUserById({ id: session?.user.id });

    const stream = await client.responses.create({
        model: "gpt-4o",
        max_output_tokens: 300,
        instructions: openaiChatPrompt(user?.nativeLanguage!, user?.targetLanguage!),
        input: messages,

    });


    return new Response(JSON.stringify(stream.output_text), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
    });
}
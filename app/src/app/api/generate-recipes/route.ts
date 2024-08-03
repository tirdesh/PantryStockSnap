// app/src/app/api/generate-recipes/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates recipe suggestions based on available ingredients.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const recipes = completion.choices[0].message.content?.trim().split("\n");
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Error generating recipes:", error);
    return NextResponse.json(
      { message: "Error generating recipes" },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const role = body.role;
    const type = body.type;
    const level = body.level;
    const techstack = body.techstack;
    const userid = body.userid;
    const amount = Number(body.amount); // IMPORTANT FIX

    if (!role || !type || !level || !techstack || !amount || !userid) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `
        Prepare questions for a job interview.
        Role: ${role}.
        Experience level: ${level}.
        Tech stack: ${techstack}.
        Focus: ${type}.
        Required number of questions: ${amount}.
        Return ONLY a JSON array like:
        ["Question 1", "Question 2", "Question 3"]
      `,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/vapi/generate:", error);

    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json(
    { success: true, message: "Working fine!" },
    { status: 200 }
  );
}

import { createAgentUIMessageStreamResponse } from "@/features/chat-page/azure-agent";
import { UIMessage } from "ai";

export async function POST(req: Request) {
  const { threadId, message }: { threadId: string; message: UIMessage } =
    await req.json();

  return createAgentUIMessageStreamResponse(
    threadId,
    "asst_6MXmhAZAM4Ncy17fY0BSND5W",
    message
  );
}

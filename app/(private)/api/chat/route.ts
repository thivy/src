import { createAgentUIMessageStreamResponse } from "@/features/chat-page/azure-agent";

export async function POST(req: Request) {
  return createAgentUIMessageStreamResponse(
    "thread_gmBqVy3vsETknVAVClDjN00g",
    "asst_6MXmhAZAM4Ncy17fY0BSND5W",
    `Write a poem about the beauty of nature and return in markdown format.`
  );
}

import {
  AgentsClient,
  DoneEvent,
  ErrorEvent,
  MessageDeltaChunk,
  MessageDeltaTextContent,
  MessageStreamEvent,
  RunStreamEvent,
  ThreadRun,
} from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import { createUIMessageStream, createUIMessageStreamResponse } from "ai";

const projectEndpoint = process.env.AZURE_AI_FOUNDRY_PROJECT_ENDPOINT!;
const agentId = process.env.AZURE_AI_FOUNDRY_DEFAULT_AGENT_ID!;
const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

export const createAgentUIMessageStreamResponse = (
  threadId: string,
  agentId: string,
  userMessage: string
) => {
  const _stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const thread = await client.threads.get(threadId);

      await client.messages.create(thread.id, "user", userMessage);

      const streamEventMessages = await client.runs
        .create(thread.id, agentId)
        .stream();

      for await (const eventMessage of streamEventMessages) {
        switch (eventMessage.event) {
          case RunStreamEvent.ThreadRunCreated:
            {
            }
            break;
          case RunStreamEvent.ThreadRunQueued:
            {
            }
            break;
          case RunStreamEvent.ThreadRunInProgress:
            {
            }
            break;
          case RunStreamEvent.ThreadRunRequiresAction:
            {
              const data = eventMessage.data as ThreadRun;
              writer.write({
                type: "data-thread-run-requires-action",
                data: {
                  id: data.id,
                  status: data.status,
                },
              });
            }
            break;
          case RunStreamEvent.ThreadRunCompleted:
            {
              const data = eventMessage.data as ThreadRun;
              writer.write({
                type: "data-thread-run-completed",
                data: {
                  id: data.id,
                  status: data.status,
                },
              });
            }
            break;
          case RunStreamEvent.ThreadRunIncomplete:
            {
              const data = eventMessage.data as ThreadRun;
              writer.write({
                type: "data-thread-run-incomplete",
                data: {
                  id: data.id,
                  status: data.status,
                },
              });
            }
            break;
          case RunStreamEvent.ThreadRunFailed:
            {
              const threadRun = eventMessage.data as ThreadRun;
              writer.write({
                type: "data-thread-run-failed",
                data: {
                  id: threadRun.id,
                  status: threadRun.status,
                },
              });
            }
            break;
          case RunStreamEvent.ThreadRunCancelling:
            {
              const threadRun = eventMessage.data as ThreadRun;
              writer.write({
                type: "data-thread-run-cancelling",
                data: {
                  id: threadRun.id,
                  status: threadRun.status,
                },
              });
            }
            break;
          case RunStreamEvent.ThreadRunCancelled:
            {
              const threadRun = eventMessage.data as ThreadRun;
              writer.write({
                type: "data-thread-run-cancelled",
                data: {
                  id: threadRun.id,
                  status: threadRun.status,
                },
              });
            }
            break;
          case RunStreamEvent.ThreadRunExpired:
            {
              const threadRun = eventMessage.data as ThreadRun;
              writer.write({
                type: "data-thread-run-expired",
                data: {
                  id: threadRun.id,
                  status: threadRun.status,
                },
              });
            }
            break;

          /** Event emitted when a message is created */
          case MessageStreamEvent.ThreadMessageCreated:
            {
              const messageDelta = eventMessage.data as MessageDeltaChunk;
              writer.write({
                type: "start",
                messageId: messageDelta.id,
                messageMetadata: {
                  threadId: thread.id,
                },
              });
            }
            break;
          case MessageStreamEvent.ThreadMessageInProgress:
            writer.write({
              type: "start-step",
            });
            const messageDelta = eventMessage.data as MessageDeltaChunk;
            writer.write({
              type: "text-start",
              id: messageDelta.id,
            });
            break;
          case MessageStreamEvent.ThreadMessageDelta:
            {
              const messageDelta = eventMessage.data as MessageDeltaChunk;
              messageDelta.delta.content.forEach((contentPart) => {
                if (contentPart.type === "text") {
                  const textContent = contentPart as MessageDeltaTextContent;
                  const textValue = textContent.text?.value || "No text";
                  writer.write({
                    type: "text-delta",
                    delta: textValue,
                    id: messageDelta.id,
                  });
                }
              });
            }
            break;
          case MessageStreamEvent.ThreadMessageCompleted:
            {
              // TODO: check which method gets call when there is a tool call
              const messageDelta = eventMessage.data as MessageDeltaChunk;
              writer.write({
                type: "text-end",
                id: messageDelta.id,
              });
            }
            break;
          case MessageStreamEvent.ThreadMessageIncomplete:
            writer.write({
              type: "error",
              errorText: "Message incomplete",
            });
            break;

          /** Terminal event indicating a server side error while streaming. */
          case ErrorEvent.Error:
            writer.write({
              type: "error",
              errorText: `${eventMessage.data}`,
            });
            break;
          /** Terminal event indicating the successful end of a stream. */
          case DoneEvent.Done:
            writer.write({
              type: "finish",
            });
            break;
        }
      }
    },
  });

  return createUIMessageStreamResponse({
    stream: _stream,
  });
};

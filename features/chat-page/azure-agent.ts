import {
  AgentsClient,
  DoneEvent,
  ErrorEvent,
  MessageDeltaChunk,
  MessageDeltaTextContent,
  MessageStreamEvent,
  RunStreamEvent,
  ToolUtility,
} from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  UIMessage,
} from "ai";

const projectEndpoint = process.env.AZURE_AI_FOUNDRY_PROJECT_ENDPOINT!;
const agentId = process.env.AZURE_AI_FOUNDRY_DEFAULT_AGENT_ID!;
const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

export const convertToAgentMessage = (message: UIMessage): string => {
  let _message = "";

  if (message.role === "user" && message.parts[0].type === "text") {
    _message = message.parts[0].text;
  }

  return _message;
};

export const createAgentUIMessageStreamResponse = (
  threadId: string,
  agentId: string,
  userMessage: UIMessage
) => {
  const _stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const thread = await client.threads.get(threadId);
      const message = convertToAgentMessage(userMessage);

      await client.messages.create(thread.id, "user", message);
      const bingTool = ToolUtility.createBingGroundingTool([
        {
          connectionId: process.env.AZURE_AI_FOUNDRY_BING_CONNECTION_ID!,
        },
      ]);

      const streamEventMessages = await client.runs
        .create(thread.id, agentId, {
          tools: [
            {
              ...bingTool.definition,
            },
          ],
        })
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
            }
            break;
          case RunStreamEvent.ThreadRunCompleted:
            {
            }
            break;
          case RunStreamEvent.ThreadRunIncomplete:
            {
            }
            break;
          case RunStreamEvent.ThreadRunFailed:
            {
              console.error(
                "Error event received in createAgentUIMessageStreamResponse",
                eventMessage.data
              );
            }
            break;
          case RunStreamEvent.ThreadRunCancelling:
            {
            }
            break;
          case RunStreamEvent.ThreadRunCancelled:
            {
            }
            break;
          case RunStreamEvent.ThreadRunExpired:
            {
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
                  let textValue = textContent.text?.value || "No text";
                  const annotations = textContent.text?.annotations || [];
                  if (annotations.length > 0) {
                    annotations.forEach((annotation) => {
                      if (annotation && annotation.type === "url_citation") {
                        const urlAnnotation = annotation as unknown as {
                          index: number;
                          text: string;
                          url_citation: { url: string; title: string };
                        };

                        textValue = textValue.replace(
                          urlAnnotation.text,
                          `:annotation[${
                            urlAnnotation.url_citation.title
                          }]{url="${urlAnnotation.url_citation.url}" index="${
                            urlAnnotation.index + 1
                          }"}`
                        );

                        writer.write({
                          type: "source-url",
                          url: urlAnnotation.url_citation.url,
                          title: urlAnnotation.url_citation.title,
                          sourceId: urlAnnotation.index.toString(),
                        });
                      }
                    });
                  }

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
          case ErrorEvent.Error: {
            writer.write({
              type: "error",
              errorText: `${eventMessage.data}`,
            });
            console.error(
              "Error event received in createAgentUIMessageStreamResponse",
              eventMessage.data
            );
            break;
          }
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

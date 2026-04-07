import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { BrowserConnection } from "../browser/connection.js";
import { textResult, errorResult } from "../utils/result.js";

export function registerResetTools(
  server: McpServer,
  conn: BrowserConnection,
): void {
  server.tool(
    "browser_reset",
    "Reset the browser connection. Use when tools fail with connection errors, page closed errors, or the browser becomes unresponsive.",
    {},
    async () => {
      try {
        await conn.disconnect();
        await conn.connect();
        const context = await conn.getContext();
        const page = await conn.getPage();
        return textResult(
          `Connection reset successfully. ${context.pages().length} page(s) available. Current page: ${page.url()}`
        );
      } catch (err) {
        return errorResult(`Reset failed: ${err instanceof Error ? err.message : String(err)}`);
      }
    },
  );
}

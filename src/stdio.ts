import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadConfig } from "./config.js";
import { createMcpServer } from "./mcp-server.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const { server, connection } = createMcpServer(config);
  const transport = new StdioServerTransport();
  await server.connect(transport);

  const shutdown = (): void => {
    connection.disconnect().catch(() => {});
    process.exit(0);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });

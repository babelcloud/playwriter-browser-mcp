import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "./config.js";
import { BrowserConnection } from "./browser/connection.js";

// Core
import { registerNavigateTools } from "./tools/navigate.js";
import { registerSnapshotTools } from "./tools/snapshot.js";
import { registerScreenshotTools } from "./tools/screenshot.js";

// Input
import { registerClickTools } from "./tools/click.js";
import { registerTypeTools } from "./tools/type.js";
import { registerKeyboardTools } from "./tools/keyboard.js";
import { registerHoverTools } from "./tools/hover.js";
import { registerDragTools } from "./tools/drag.js";
import { registerSelectTools } from "./tools/select.js";
import { registerFormTools } from "./tools/form.js";

// Page management
import { registerTabTools } from "./tools/tabs.js";
import { registerCloseTools } from "./tools/close.js";
import { registerWaitTools } from "./tools/wait.js";
import { registerResizeTools } from "./tools/resize.js";

// Code execution
import { registerEvaluateTools } from "./tools/evaluate.js";
import { registerRunCodeTools } from "./tools/run-code.js";

// Observability
import { registerConsoleTools } from "./tools/console.js";
import { registerNetworkTools } from "./tools/network.js";

// File & dialog
import { registerFileTools } from "./tools/files.js";
import { registerDialogTools } from "./tools/dialog.js";

// Testing & verification
import { registerTestingTools } from "./tools/testing.js";

// PDF
import { registerPdfTools } from "./tools/pdf.js";

// Tracing
import { registerTracingTools } from "./tools/tracing.js";

// Connection recovery
import { registerResetTools } from "./tools/reset.js";

export function createMcpServer(config: Config): {
  server: McpServer;
  connection: BrowserConnection;
} {
  const server = new McpServer({
    name: "visionclaw-browser",
    version: "0.1.0",
  });

  const connection = new BrowserConnection(config);

  // ── Core navigation & snapshot ──
  registerNavigateTools(server, connection);       // browser_navigate, browser_navigate_back
  registerSnapshotTools(server, connection);        // browser_snapshot
  registerScreenshotTools(server, connection, config); // browser_take_screenshot

  // ── Input tools ──
  registerClickTools(server, connection);           // browser_click
  registerTypeTools(server, connection);            // browser_type
  registerKeyboardTools(server, connection);        // browser_press_key
  registerHoverTools(server, connection);           // browser_hover
  registerDragTools(server, connection);            // browser_drag
  registerSelectTools(server, connection);          // browser_select_option
  registerFormTools(server, connection);            // browser_fill_form

  // ── Page management ──
  registerTabTools(server, connection);             // browser_tabs
  registerCloseTools(server, connection);           // browser_close
  registerWaitTools(server, connection);            // browser_wait_for
  registerResizeTools(server, connection);          // browser_resize

  // ── Code execution ──
  registerEvaluateTools(server, connection);        // browser_evaluate
  registerRunCodeTools(server, connection);         // browser_run_code

  // ── Observability ──
  registerConsoleTools(server, connection);         // browser_console_messages
  registerNetworkTools(server, connection);         // browser_network_requests

  // ── File & dialog ──
  registerFileTools(server, connection);            // browser_file_upload
  registerDialogTools(server, connection);          // browser_handle_dialog

  // ── Testing & verification ──
  registerTestingTools(server, connection);         // browser_generate_locator, browser_verify_element_visible,
                                                    // browser_verify_text_visible, browser_verify_list_visible,
                                                    // browser_verify_value

  // ── PDF ──
  registerPdfTools(server, connection, config);     // browser_pdf_save

  // ── Tracing ──
  registerTracingTools(server, connection, config); // browser_start_tracing, browser_stop_tracing

  // ── Connection recovery ──
  registerResetTools(server, connection);             // browser_reset

  return { server, connection };
}

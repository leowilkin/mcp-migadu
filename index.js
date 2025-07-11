#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "mcp-migadu",
    version: "2.2.1"
});

async function alias_create({ alias, domain, forwarding_address, is_internal }) {
    const url = `https://api.migadu.com/v1/domains/${domain}/aliases`;
    const auth = Buffer.from(`${process.env.MIGADU_USER}:${process.env.MIGADU_API_KEY}`).toString('base64');
    const body = JSON.stringify ({
        local_part: alias,
        destinations: [forwarding_address],
        is_internal
    });


    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        },
        body,
    });

    if (!response.ok) {
    throw new Error(`Couldn't create a new alias: (${response.status}): ${response.body}`);
    }

   const data = await response.json();

   return {
        content: [{ type: "text", text: JSON.stringify(data) }]
   };
}

async function alias_show({ alias, domain }) {
    const url = `https://api.migadu.com/v1/domains/${domain}/aliases/${alias}`;
    const auth = Buffer.from(`${process.env.MIGADU_USER}:${process.env.MIGADU_API_KEY}`).toString('base64');


    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
    throw new Error(`Couldn't showing exising aliases: (${response.status}): ${response.body}`);
    }

   const data = await response.json();

   return {
        content: [{ type: "text", text: JSON.stringify(data) }]
   };
}

async function mailbox_index({ domain }) {
    const url = `https://api.migadu.com/v1/domains/${domain}/mailboxes`;
    const auth = Buffer.from(`${process.env.MIGADU_USER}:${process.env.MIGADU_API_KEY}`).toString('base64');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
    throw new Error(`Couldn't index mailboxes: (${response.status}): ${response.body}`);
    }

   const data = await response.json();

   return {
        content: [{ type: "text", text: JSON.stringify(data) }]
   };
}

async function mailbox_show({ local_part, domain }) {
    const url = `https://api.migadu.com/v1/domains/${domain}/mailboxes/${local_part}`;
    const auth = Buffer.from(`${process.env.MIGADU_USER}:${process.env.MIGADU_API_KEY}`).toString('base64');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
    throw new Error(`Can't display mailbox information: (${response.status}): ${response.body}`);
    }

   const data = await response.json();

   return {
        content: [{ type: "text", text: JSON.stringify(data) }]
   };
}

server.registerTool("alias_create", {
    title: "Create a new email alias",
    description: "To create a new alias demo@mydomain.org with destinations one@mydomain.org and two@mydomain.org you can call the aliases API as in the example below. Note that aliases can redirect only on the same domain.",
    inputSchema: {
        alias: z.string().describe("The raw inbox name part of the alias. e.g if the alias is hello@example.com, enter hello."),
        domain: z.string().describe("The domain of the email address. e.g. example.com"),
        forwarding_address: z.string().describe("The existing email address that the alias should forward to. Can only be on the same domain. e.g. hello@example.com as the alias can only forward to leo@example.com"),
        is_internal: z.boolean().optional().describe("If you want setup internal, private alias and restrict it to receive messages only via Migadu outgoing servers, please set option is_internal to `true` like in the example below. Note that no external messages would be accepted.").default(false)
    },
}, alias_create);

server.registerTool("alias_show", {
    title: "Show an existing alias",
    description: "Individual aliases are accessible by their local part for individual operations. For example, to show alias information of demo@mydomain.org , we could call the API as in the example below.",
    inputSchema: {
        alias: z.string().describe("The raw inbox name part of the alias. e.g if the alias is hello@example.com, enter hello."),
        domain: z.string().describe("The domain of the email address. e.g. example.com"),
    },
}, alias_show);

server.registerTool("mailbox_index", {
    title: "Index all mailboxes",
    description: "Get all mailboxes of a domain through a GET request.",
    inputSchema: {
        domain: z.string().describe("The domain of the email address. e.g. example.com")
    },
}, mailbox_index);

server.registerTool("mailbox_show", {
    title: "Show the details of a mailbox",
    description: "Get the details of a mailbox.",
    inputSchema: {
        domain: z.string().describe("The domain of the email address. e.g. example.com"),
        local_part: z.string().describe("The raw inbox name part of the email. e.g if the alias is hello@example.com, enter hello.")
    },
}, mailbox_show);

const transport = new StdioServerTransport();
await server.connect(transport)
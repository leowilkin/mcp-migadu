#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "mcp-migadu",
    version: "2.2.1"
});

async function alias_create({ alias, domain, address, is_internal }) {
    const url = `https://api.migadu.com/v1/domains/${domain}/aliases`;
    const auth = Buffer.from(`${process.env.MIGADU_USER}:${process.env.MIGADU_API_KEY}`).toString('base64');
    const body = JSON.stringify ({
        local_part: alias,
        destinations: [address],
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

async function alias_index({ domain }) {
    const url = `https://api.migadu.com/v1/domains/${domain}/aliases`;
    const auth = Buffer.from(`${process.env.MIGADU_USER}:${process.env.MIGADU_API_KEY}`).toString('base64');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
    throw new Error(`Couldn't index aliases: (${response.status}): ${response.body}`);
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

async function mailbox_create({ name, local_part, password_recovery_email, password_method, is_internal, domain }) {
    const url = `https://api.migadu.com/v1/domains/${domain}/mailboxes`;
    const auth = Buffer.from(`${process.env.MIGADU_USER}:${process.env.MIGADU_API_KEY}`).toString('base64');
    const body = JSON.stringify ({
        name,
        local_part,
        password_method,
        password_recovery_email,
        is_internal,
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
    throw new Error(`Couldn't create a new mailbox: (${response.status}): ${response.body}`);
    }

   const data = await response.json();

   return {
        content: [{ type: "text", text: JSON.stringify(data) }]
   };
}

async function forwardings_index({ domain }) {
    const url = `https://api.migadu.com/v1/domains/${domain}/forwardings`;
    const auth = Buffer.from(`${process.env.MIGADU_USER}:${process.env.MIGADU_API_KEY}`).toString('base64');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
    throw new Error(`Couldn't index forwardings: (${response.status}): ${response.body}`);
    }

   const data = await response.json();

   return {
        content: [{ type: "text", text: JSON.stringify(data) }]
   };
}

async function forwardings_show({ local_part, forwarding_address, domain }) {
    const url = `https://api.migadu.com/v1/domains/${domain}/mailboxes/${local_part}/forwardings/${forwarding_address}`;
    const auth = Buffer.from(`${process.env.MIGADU_USER}:${process.env.MIGADU_API_KEY}`).toString('base64');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
    throw new Error(`Can't display forwarding information: (${response.status}): ${response.body}`);
    }

   const data = await response.json();

   return {
        content: [{ type: "text", text: JSON.stringify(data) }]
   };
}

async function forwardings_create({ local_part, domain, forwarding_address }) {
    const url = `https://api.migadu.com/v1/domains/${domain}/mailboxes/${local_part}/forwardings`;
    const auth = Buffer.from(`${process.env.MIGADU_USER}:${process.env.MIGADU_API_KEY}`).toString('base64');
    const body = JSON.stringify ({
        local_part,
        destinations: [forwarding_address],
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
    throw new Error(`Couldn't create a new forwarding: (${response.status}): ${response.body}`);
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

server.registerTool("alias_index", {
    title: "Index all aliases",
    description: "Get all aliases of a domain through a GET request.",
    inputSchema: {
        domain: z.string().describe("The domain of the email address. e.g. example.com")
    },
}, alias_index);

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

server.registerTool("mailbox_create", {
    title: "Create a new mailbox",
    description: "To create a new mailbox demo@mydomain.org with admin panel name Mailbox Name and invite the future user of it at invitee@somewhere.tld to set own password, you can call the mailboxes API as in the example below. The field password_method is not required and it has a default value `password`. Its only use is when you need to invite the mailbox owner to set own password. In that case password_method should be set to `invitation` and field password_recovery_email must be provided.",
    inputSchema: {
        name: z.string().describe("The name visible to an admin, and set as the primary identity visible to all mail users."),
        local_part: z.string().describe("The raw inbox name part of the alias. e.g if the alias is hello@example.com, enter hello."),
        password_recovery_email: z.string().describe("The email address used as a password reset, and to send the intial invite to set a password."),
        password_method: z.string().default("invitation"),
        domain: z.string().describe("The domain of the email address. e.g. example.com"),
        is_internal: z.boolean().optional().describe("If you want setup internal, private mailbox and restrict it to receive messages only via Migadu outgoing servers, please set option is_internal to `true` like in the example below. Note that no external messages would be accepted.").default(false)
    },
}, mailbox_create);

server.registerTool("forwardings_index", {
    title: "Index all forwardings",
    description: "Get all forwardings on a domain through a GET request.",
    inputSchema: {
        domain: z.string().describe("The domain of the email address. e.g. example.com")
    },
}, forwardings_index);

server.registerTool("forwardings_show", {
    title: "Show the details of a forward",
    description: "Get the details of a forward.",
    inputSchema: {
        domain: z.string().describe("The domain of the email address. e.g. example.com"),
        local_part: z.string().describe("The raw inbox name part of the email. e.g if the alias is hello@example.com, enter hello."),
        forwarding_address: z.string().describe("The existing email address that the forward sends forwards to."),

    },
}, forwardings_show);

server.registerTool("forwardings_create", {
    title: "Create a new email forwarding",
    description: "To create a new forwarding from demo@mydomain.org with destination one@mydomain.org you can call the forwardings_create API as in the example below.",
    inputSchema: {
        local_part: z.string().describe("The raw inbox name part of the mailbox. e.g if the address is hello@example.com, enter hello."),
        domain: z.string().describe("The domain of the email address. e.g. example.com"),
        address: z.string().describe("The existing email address that the forwarding should forward to."),
    },
}, forwardings_create);

const transport = new StdioServerTransport();
await server.connect(transport)
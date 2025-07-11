# Migadu MCP

I'm building an AI Agent MCP Platform to interface with Migadu's API! Think chatting with an assistant that can make and edit your inbox settings on Migadu - how efficient & simple!

## Installation Instructions

You can install this to your IDE or LLM wrapper using this config, using Claude Desktop's config here as an example!

```json
{
    "mcpServers": {
        "mcp-migadu": {
            "command": "npx",
            "args": [
                "-y",
                "mcp-migadu"
            ],
            "env": {
                "MIGADU_API_KEY": "api_key",
                "MIGADU_ROOT_DOMAIN": "domain",
                "MIGADU_USER": "user's email"
            }
        }
    }
}
```

## Features

### Aliases

- Create a new email alias (alias_create)
- Show an existing alias (alias_show)
- Index all aliases (alias_index)

### Mailboxes

- Index all mailboxes (mailbox_index)
- Show the details of a mailbox (mailbox_show)
- Create a new mailbox (mailbox_create)

### Forwardings

- Index all forwardings (forwardings_index)
- Show the details of a foreward (forwardings_show)
- Create a new email forwarding - a bit broken rn (forwardings_create)

### Others

Yes, there are quite a few that have been excluded, but this was mostly a design choice to prevent LLMs mucking up your emails.

## Reference

- [Migadu API Documentation](https://migadu.com/api/)
- Hack Club's [Toolsmith Guide](https://toolsmith.hackclub.com/guide.html)
# Migadu MCP

I'm building an AI Agent MCP Platform to interface with Migadu's API!

At the moment, you can create an alias by asking Claude Desktop.

## Installation Instructions

You can install this to your IDE or LLM wrapper using this config, using Claude as an example!

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

You can create an alias of another email.

#### Schema

```json
alias: z.string().describe("The raw inbox name part of the alias. e.g if the alias is hello@example.com, enter hello."),
domain: z.string().describe("The domain of the email address. e.g. example.com"),
forwarding_address: z.string().describe("The existing email address that the alias should forward to. Can only be on the same domain. e.g. hello@example.com as the alias can only forward to leo@example.com")
```

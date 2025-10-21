curl 'https://cms-idp.capybera.xyz/self-service/registration/browser' \
  -H 'accept: application/json' \
  -H 'accept-language: en-US,en;q=0.9,vi;q=0.8' \
  -H 'content-type: application/json' \
  -H 'origin: http://localhost:5173' \
  -H 'priority: u=1, i' \
  -H 'referer: http://localhost:5173/' \
  -H 'sec-ch-ua: "Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"' \
  -H 'sec-ch-ua-mobile: ?1' \
  -H 'sec-ch-ua-platform: "Android"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36'

  {
    "id": "558e3136-0f53-4163-8059-1bf819609519",
    "type": "browser",
    "expires_at": "2025-09-19T04:36:46.402723022Z",
    "issued_at": "2025-09-19T03:36:46.402723022Z",
    "request_url": "http://cms-idp.capybera.xyz/self-service/registration/browser",
    "ui": {
        "action": "https://cms-idp.capybera.xyz/self-service/registration?flow=558e3136-0f53-4163-8059-1bf819609519",
        "method": "POST",
        "nodes": [
            {
                "type": "input",
                "group": "oidc",
                "attributes": {
                    "name": "provider",
                    "type": "submit",
                    "value": "google",
                    "disabled": false,
                    "node_type": "input"
                },
                "messages": [],
                "meta": {
                    "label": {
                        "id": 1040002,
                        "text": "Sign up with google",
                        "type": "info",
                        "context": {
                            "provider": "google",
                            "provider_id": "google"
                        }
                    }
                }
            },
            {
                "type": "input",
                "group": "default",
                "attributes": {
                    "name": "traits.email",
                    "type": "email",
                    "required": true,
                    "autocomplete": "email",
                    "disabled": false,
                    "node_type": "input"
                },
                "messages": [],
                "meta": {
                    "label": {
                        "id": 1070002,
                        "text": "E-Mail",
                        "type": "info",
                        "context": {
                            "title": "E-Mail"
                        }
                    }
                }
            },
            {
                "type": "input",
                "group": "default",
                "attributes": {
                    "name": "traits.name",
                    "type": "text",
                    "disabled": false,
                    "node_type": "input"
                },
                "messages": [],
                "meta": {}
            },
            {
                "type": "input",
                "group": "default",
                "attributes": {
                    "name": "csrf_token",
                    "type": "hidden",
                    "value": "HL7Pc1grep1iXLDseJaI3JgQ7PaWPY1F93DEnfacAtfc/WFQ9wjkDDmXYRZR6haa15cT92VX3yColBmOZjzKPQ==",
                    "required": true,
                    "disabled": false,
                    "node_type": "input"
                },
                "messages": [],
                "meta": {}
            },
            {
                "type": "input",
                "group": "profile",
                "attributes": {
                    "name": "method",
                    "type": "submit",
                    "value": "profile",
                    "disabled": false,
                    "node_type": "input"
                },
                "messages": [],
                "meta": {
                    "label": {
                        "id": 1040001,
                        "text": "Sign up",
                        "type": "info"
                    }
                }
            }
        ]
    },
    "organization_id": null,
    "state": "choose_method"
}
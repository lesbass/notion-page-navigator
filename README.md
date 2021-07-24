# Notion Page Navigator

This is a simple React/Next.js application which lets people create a card-style navigation around a basic Notion Database.
It was originally meant to be used for going through a list of fitness exercises on a smartphone, so I implemented the below features:
- show the page number on the total count
- quickly go back to the first page
- text-to-speech
- page image
- page text
- countdown (useful for those exercise where you need to stay in position for a fixed amount of time)
- swipe left/right functionality on touch devices

The reference database is: https://lesbass.notion.site/778479d27c4b4c28bf28d928994a28e0?v=a0b83aae9cd54610abff7135c98f3283

## Setup
The easiest way to use the app is by cloning the repository on your Github account and linking it to a free Netlify account.
On the server, you need to setup some enviromental variables:
- `NOTION_KEY`: the Notion Api key
- `NOTION_DATABASE_ID`: the Notion Database Id you are mapping
- `GCP_CLIENT_EMAIL` and `GCP_PRIVATE_KEY`: the Google Api keys needed for the Text-to-speech functionality
- `TTS_LOCALE`: locale for the text-to-speech (es. `it-IT`)

## Run it on your machine
Just clone the repository and run
### `npm run dev`

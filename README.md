# Crossmint Challenge

## Description

This project is designed to tackle the Crossmint coding challenge, focusing on developing a solution that integrates with Crossmint's Megaverse API. The goal is to create the requested Megaverse map utilising the Megaverse creator. Megaverses are 2D spaces comprised of combinations of different astral objects: 🪐POLYanets with 🌙SOLoons around them and ☄comETHs floating around.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (preferably the latest LTS version)

### Installation

To install the Crossmint Challenge, follow these steps:

```bash
git clone https://github.com/julianariel/crossmint-challenge.git
cd crossmint-challenge
npm install
```

Create a `.env` file with the following contents:

```env
CANDIDATE_ID="1fa26b6a-4f79-48cb-bcde-788a3e29a112"
API_URL="https://challenge.crossmint.io/api"
```

### Usage

This command will compile and run the `main()` function at the `index.ts` file:

```bash
npm start
```

### Explanation

The script starts by fetching the initial goal data from the **Crossmint Megaverse API**. It then processes this data, identifying and categorizing different astral objects based on their types (POLYanets, SOLoons, and comETHs). Each object is created in the Megaverse according to its specifications, with a slight delay between requests to avoid hitting the API rate limit.

Techonlogies used: NodeJS, TypeScript, Megaverse API

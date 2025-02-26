# Yoga API 🌏

A simple API for discovering, understanding, learning, and integrating the science of Yoga. 


<p align="center"><img src="./assets/yoga_api_logo.png" width="230" alt="Khoj Logo"></p>

<div align="center">

[![GitHub License](https://img.shields.io/badge/license-MIT-blue)](#license)
[![Python Version](https://img.shields.io/badge/typescript-5.7.3%2B-blue)](https://www.python.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)](#contributors)

</div>

<div align="center">
<b>...And Now Yoga 🕉️</b>
</div>

<br />

<div align="center">

[💡 Docs](https://github.com/AdiPat/yoga-api)
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
[🕸️ Web](https://github.com/AdiPat/yoga-api)
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>

</div>

## Background 

Yoga API empowers developers to create mindful applications by seamlessly integrating yoga knowledge and practices. With Yoga API, you can deploy feature-rich applications related to Yoga with minimal effort, offering users spiritual insights, personalized plans, and ancient wisdom at their fingertips. 

The development of Yoga API is an initiative by ShinCy Labs, on the special occasion of MahaShivRatri 2025. Our goal was to build something special, useful and Open Source for the world on this auspicious day. 

We provide the foundation (API) and let developers and product designers create the kind of user experiences they desire using our features as the underlying platform.


## Key Features

- 🌟 **Ask Yogi** - AI-powered Q&A on Yoga.

- 📖 **Yoga Sutra Search** - Explore ancient Yoga scriptures.

- 📅 **Karma Yoga Plan** - Provide your daily schedule and receive Karma Yoga practice tips.

- 📰 **Yoga News** - Keep up with the Yoga world.

## Getting Started

1. **Install the package:**

   ```bash
   npm install yoga-api
   ```

2. **Set up environment variables:**

   Create a `.env` file in your project's root directory and add your API key:

   ```plaintext
   OPENAI_API_KEY=your-openai-api-key
   FIRECRAWL_API_KEY=your-firecrawl-api-key
   SERPER_API_KEY=your-serper-api-key
   ```

3. **Use the API in your project:**

```typescript
import { YogaAPI } from "yoga-api";

const yogaAPI = new YogaAPI();

yogaAPI.startServer({
  port: 3000,
});
```

4. **TBA:** Please refer to the API documentation for further details on usage.

## Contributing

We welcome contributions from developers around the globe. To get started, please review the Contributing Guidelines and submit your ideas, bug reports, or pull requests. Together, we can make Yoga even better.

## Licence

Yoga API is distributed under the MIT License. Refer to the LICENSE file for full details. Please also read the Terms of Use and Trademark.

> "Yoga is the journey of the self, through the self, to the self." — The Bhagavad Gita


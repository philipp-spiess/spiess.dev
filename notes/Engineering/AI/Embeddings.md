---
date: 2023-05-05
---
Understanding and processing natural language is a complex task. Embeddings are a powerful tool in todays ML/AI discussions to address this problem. 

## Mental model
In my mental model, embeddings are used to encode words into *meaning*. Embeddings are encodings in n-dimensional vector space where every parameter is a signed a specific _meaning_ in the object space.

I can't really imagine n-dimensional vectors but for an embedding system with two vectors, I like to visualize it like this:

```
terrain (y-axis)
|
|
|             o (mountain bike)
|
|                       o (road bike)
|
|
|      o (horse)
|
|                                    o (car)
|
|
+------------------------------- speed (x-axis)
```

In this example, each point represents a mode of transportation. Items with similar speed and terrain capabilities are placed closer together. For example, a mountain bike and a road bike are closer to each other because they have similar speeds and are both used on different terrains, while a car is further away since it operates at higher speeds on more paved terrains.

There are two super-powers from being able to map natural language onto an n dimensional vector space:

- We can use relatively simple vector algorithms to quickly find relevant words. Algorithms like [kNN](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) are easy to be optimized with spacial maps so lookup is fast. In our example, we can see that a *mountain bike* is closer to a *road bike* than it is to a horse.
- Embeddings compress insanely well. It's entirely possible to compress _pages_ of written language into a vector size of a few hundred vectors.

There are also some downsides, though:

- Training an embedding system is like training any other ML system: It's a complex and expensive task. And even with a fully trained model, you will need a lot of compute power to convert a piece of text into embeddings. That's why it's currently common to outsource embeddings generation to third-party APIs like OpenAI.
- When a model is trained, we don't really know what _meaning_ each value of the vector is assigned to. This makes it hard to understand why a specific pair of text is considered close to each other or not.

## How are embeddings used?
Because of the fast way to find related vector pairs, embeddings are often used to answer search problems. In the current AI discourse, embeddings are used to quickly and efficiently find relevant context in order to put it into the prompt of a large-language model (LLM).

Imagine an AI system to ask questions about your code documentation. We can, ahead of time, create embeddings for every paragraph in the documentation and store it in a vector database (a database that can hold the embedding vectors for us and has some index to efficiently query it. Like the [pgvector](https://github.com/pgvector/pgvector) extension for Postgres).

Now, when the user enters a question in natural text into our AI system, we can find the most relevant paragraphs into our documentation. We usually want to pick as many as we can fit into the prompt of the LLM. The LLM now has an *understanding of your documentation* when answering the question. Fascinating! 

One important thing from the paragraphs above is that we have to *split* the documentation into meaningful chunks. Since we can only retrieve similarity in windows of this chunk site, you can easily see how important it is to pick a proper system. 

## Some links I want to remember
- [Getting Started With Embeddings](https://huggingface.co/blog/getting-started-with-embeddings)
- [MTEB: Massive Text Embedding Benchmark](https://huggingface.co/blog/mteb)
- [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard)

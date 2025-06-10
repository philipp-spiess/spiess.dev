---
date: 2023-05-04
---
When building an AI code assistant like [Cody](https://about.sourcegraph.com/cody), you often find yourself in need for a quick way to rank the similarity of two blocks of text relative to each other.

This is where [Jaccard similarity](https://en.wikipedia.org/wiki/Jaccard_index) is helpful. Jaccard similarity is a metric to find similarity between two sets of data, typically used for comparing text data. 

The equation for Jaccard distance is:

```
J(A, B) = |A ∩ B| / |A ∪ B|
```


Here's a simple example in TypeScript to calculate the Jaccard distance between two sentences:

```typescript
function jaccardDistance(sentence1: string, sentence2: string): number {
  const set1 = new Set(sentence1.split(' '));
  const set2 = new Set(sentence2.split(' '));
  
  const intersection = new Set([...set1].filter(x => set2.has(x))).size;
  const union = new Set([...set1, ...set2]).size;
  
  return intersection / union;
}
```

The Jaccard similarity comes in handy for finding similar text, like detecting plagiarism or comparing documents. It might not be the most advanced method for text comparison, but it's simple and fast, making it great for many applications.

You can even do some pre-processing on the text to increase its accuracy. The above example is naively comparing words but you could use [stemming](https://en.wikipedia.org/wiki/Stemming) to make it easier to compare words with the same meaning.

Why not give it a try with some sample texts and see how it works for you?
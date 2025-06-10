---
date: 2022-02-21
---
- Being not constraint to a specific domain is one of React's killer features.
- In React DOM, you can always fall back to creating custom `<div>` elements with your own styles if something doesn't work.
	- There's a maintainance overhead by doing so but it also unblocks so many use cases.
	- Even at the new Facebook.com, custom containers with with the full fallback to the browser were very common.
- Every good design systems that I have seen embraces this and allows their users to forward e.g. custom class names to their inner working components. 
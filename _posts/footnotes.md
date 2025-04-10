---
layout: post
title: "Better Footnotes"
date: 10th April 2025
tags: New
---

When you write something that needs additional context or a citation, you can add a footnote[^1].

Footnotes are helpful for providing more information without disrupting the flow of your main content. They can be used for citations, clarifications, or just to add interesting asides[^2].

> The best footnote is one that adds context without demanding it be read. It should be there for the curious reader, not the casual one.

You can use these for technical clarifications as well[^3]. And unlike traditional print footnotes, these are interactive – try hovering over or clicking on the footnote references!

## How it works

The system uses HTML, CSS, and a bit of JavaScript to make the footnotes interactive. The key components are:

1. Footnote references in the text with proper IDs and roles  
2. The footnotes section at the bottom with corresponding IDs  
3. JavaScript that shows the footnote content when you interact with the reference

The markup follows accessibility standards by using proper ARIA roles. You can even navigate to the footnotes and back using the links[^4].

## Credits

Lastly, this feature was adapted (read stolen) from [this post](https://tools.simonwillison.net/colophon#footnotes-experiment.html) by Simon Willison. Some of the changes I made are:

- Clicking the footnote does not take you to the footnote listed at the end of the page, instead the interaction now works as hover to preview, click to toggle/hide. The footnotes are listed at the bottom of the page only so that the footnote references are visible say when the page is printed.
- The popup now does not contain the back-link symbol.


[^1]: This is the first footnote. It provides additional information that would otherwise clutter the main text.

[^2]: This second footnote could be used for citation. For example: Smith, J. (2023). *The Art of Footnotes*. *Journal of Useless Knowledge*, 42(1), 123–145.

[^3]: The footnote system uses the `:target` CSS selector and JavaScript to enhance the user experience. This technical approach allows for both progressive enhancement and accessibility.

[^4]: The back-link (↩) takes you back to where you came from in the text, which is particularly useful in longer documents.


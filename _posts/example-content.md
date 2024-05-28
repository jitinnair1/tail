---
layout: post
title: "Example Content"
date: 4th Oct 2022
tags: Old
excerpt_separator: <!--more-->
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt ornare nibh, non elementum augue tempus eget. Pellentesque tempus scelerisque iaculis.<!--more--> Nullam interdum ultricies nibh quis sollicitudin. Donec ornare fermentum facilisis. Ut at sem ac sem imperdiet varius a eget tortor. Nam eu augue eget orci semper maximus in eget augue. Mauris ornare, nisl ut suscipit consectetur, mi quam interdum tellus, at rutrum quam eros ultrices mi.

# Headers
```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

# H1
## H2
### H3
#### H4
##### H5
###### H6

# Text formatting
```markdown
- **Bold**
- _Italics_
- ~~Strikethrough~~
- <ins>Underline</ins>
- <sup>Superscript</sup>
- <sub>Subscript</sub>
- Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>
- Citation: <cite>&mdash; Your Name</cite>
```

gives you:

- **Bold**
- _Italics_
- ~~Strikethrough~~
- <ins>Underline</ins>
- <sup>Superscript</sup>
- <sub>Subscript</sub>
- Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>
- Citation: <cite>&mdash; Your Name</cite>

# Lists

```markdown
1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

* Unordered list item 1
* Unordered list item 2
* Unordered list item 3
```

look like this:

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

* Unordered list item 1
* Unordered list item 2
* Unordered list item 3

# Links

```markdown
Check out tail on [GitHub](https://github.com/jitinnair1/tail).
```

give you this:

Check out tail on [GitHub](https://github.com/jitinnair1/tail).

# Images

```markdown
![An image](url "Alt Text")

![Image with caption](url "Image with caption")
_This is an image with a caption_
```

![An image](https://images.unsplash.com/photo-1664784805210-9fa665e2b7e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80 "An image")

![Image with caption](https://images.unsplash.com/photo-1527697911963-20cb424e9608?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1486&q=80 "Image with caption")
_This is an image with a caption_

# Code and Syntax Highlighting

Use back-ticks for `inline code`. Multi-line code snippets are supported too through. Specify the language after the back-ticks for language specific syntax highlighting.

`````
```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```
`````

which will give you syntax highlighting like this:

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

## To display line numbers in codeblocks, you can set them as an option in `_config.yml`

```yaml
kramdown:
  syntax_highlighter: rouge
  syntax_highlighter_opts:
    block:
      line_numbers: true

```


# Blockquotes

```markdown
> Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.
```

> Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.

# Horizontal Rule & Line Break

Use `<hr>` for horizontal rules like this

```markdown
<hr>
```

gives you 

<hr>

and `<br>` for line breaks:

```markdown
This <br> breaks the line
```

which will give you:

This <br> breaks the line


_The end_

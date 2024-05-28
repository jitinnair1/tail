---
title: "Posts Without Date in Frontmatter"
layout: post
date: 1st Sept 2022
lastmod: 3rd Dec 2022
comments: false
tags: Tail
excerpt_separator: <!--more-->
hidden: false
---

Typically, posts in Jekyll have a `date` entry in the post’s frontmatter. This date, if not specified will be taken to be the date when the post was last modified.

<!--more-->

This is done using the `jekyll-last-modified` custom plugin (check the `_plugins` directory in the source files). The last-modified date is only used, if a `date` in not specified in the front matter. Also, you can specify the `lastmod` date in the front matter using the `last_modified_at` keyword:

```yaml
---
title: "Posts Without Date in Frontmatter"
layout: post
date: 1st Sept 2022
showlastmod: yes
lastmod: 3rd Dec 2022
comments: false
tags: Tail
excerpt_separator: <!--more-->
hidden: false
---
```
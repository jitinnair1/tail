---
title: "Posts Without Date in Filename"
date: 1st Oct 2022
layout: post
comments: false
tags: New
excerpt_separator: <!--more-->
hidden: false
---

Typically, posts in Jekyll have a `YYYY-MM-DD` portion in the post’s filename. The individual markdown posts can be freed from this naming convention to reduce the clutter in the filename. 

<!--more-->

Also, it become easier to export a set of `*.md` files from any note-taking app and add them to the `_posts` folder without worrying about changing the filenames. 

Tail does this by using a [small plugin](https://stackoverflow.com/a/68287682/9523246) that changes the `DATE_FILENAME_MATCHER` for `_posts` and `_drafts` folders

```ruby
class Jekyll::PostReader
    # Don't use DATE_FILENAME_MATCHER so we don't need to put those stupid dates
    # in the filename. Also limit to just *.markdown, so it won't process binary
    # files from e.g. drags.
    def read_posts(dir)
      read_publishable(dir, "_posts", /.*\.md$/)
    end
    def read_drafts(dir)
      read_publishable(dir, "_drafts", /.*\.md$/)
    end
  end
```
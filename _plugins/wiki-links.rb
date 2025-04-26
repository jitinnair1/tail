# _plugins/wiki_links.rb

Jekyll::Hooks.register [:posts], :pre_render do |post, payload|
  site = post.site

  #build a quick lookup of existing post slugs (without extensions)
  post_slugs = site.posts.docs.map { |p| File.basename(p.path, ".md") }

  #this regex finds [[wikilinks]] with optional custom titles
  post.content.gsub!(/\[\[([^\]\|]+)(\|([^\]]+))?\]\]/) do |_match|
    target_slug = Regexp.last_match(1).strip
    custom_title = Regexp.last_match(3)&.strip

    #convert target slug for URL (spaces to hyphens, lowercase)
    url_slug = target_slug.downcase.gsub(' ', '-')

    #validate if target post actually exists
    unless post_slugs.include?(url_slug)
      Jekyll.logger.warn "WikiLink Warning:", "Post '#{url_slug}' not found. Leaving raw link."
      next "[[#{target_slug}]]" #leave the link untouched
    end

    #build the URL
    url = "#{site.baseurl}/#{url_slug}"

    #use custom title if available, else the target slug
    link_text = custom_title || target_slug

    #return the HTML anchor tag
    "<a href=\"#{url}\">#{link_text}</a>"
  end
end


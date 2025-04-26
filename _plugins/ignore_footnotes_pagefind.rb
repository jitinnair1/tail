require 'nokogiri'

module Jekyll
  module StripFootnotesFilter

    def ignore_footnotes_pagefind(raw)
      #parse the raw input as an HTML fragment with UTF-8 encoding
      doc = Nokogiri::HTML.fragment(raw.encode('UTF-8', :invalid => :replace, :undef => :replace, :replace => ''))

      #mark <sup> tags containing <a class="footnote"> for Pagefind to ignore
      doc.css('sup').each do |sup|
        a = sup.at_css('a.footnote')
        sup.set_attribute('data-pagefind-ignore', '') if a
      end

      #return modified HTML
      doc.inner_html

    end
  end
end

Liquid::Template.register_filter(Jekyll::StripFootnotesFilter)

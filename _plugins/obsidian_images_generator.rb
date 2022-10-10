class WikiImages < Jekyll::Generator
  priority :highest
  def generate(site)

    all_notes = site.collections['notes'].docs
    all_pages = site.collections['pages'].docs

    all_docs = all_notes + all_pages

    all_docs.each do |current_note|

      image_path = "/assets/images/"

      # Generate HTML code for Markdown images adding image_path.
      current_note.content = current_note.content.gsub(
        /
        !\[{1} # One match of ![
        ([^\]]*) # Alt Text between [] -> \1
        \] # Ending alt text bracket ]
        \( # Starting Parenthesis
        (?!assets)(?!\/assets)(?!http) # Negative lookahead
        ([^"|')]*) # Select filename -> \2
        ["|']?([^"|']*)["|']? # Select title -> \3
        \){1} # One match of )
        (?!`$) # Exclude codeblocks ending in `
        /x,
        '<img src="' + image_path + '\2" alt="\1" title="\3">'
      )

      # Generate HTML code for Obsidian images adding image_path ex. ![[image.png]]
      current_note.content = current_note.content.gsub(
        /
        !\[\[ # Starting with ![[
        (?!assets)(?!\/assets) # Exclude embeds with assets path
        ([^\]]+) # Capture entire filename
        \]\] # Make sure it ends in ]]
        (?!`$) # Exclude codeblocks ending in `
        /x,
        '<img src="' + image_path + '\1">'
      )

      # Convert remaining Obsidian image embeds ex. ![[assets/images/image.png]]
      current_note.content = current_note.content.gsub(
        /
        !\[\[ # Starting with ![[
        ([^\]]+) # Capture entire filename
        \]\] # Make sure it ends in ]]
        (?!`$) # Exclude codeblocks ending in `
        /x,
        '<img src="\1">'
      )


    end
  end
end

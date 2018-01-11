json.id song.id
json.artistId song.user_id
json.title song.title
json.imageUrl asset_path(song.image.url)
json.audioUrl song.audio.url
json.createdAt song.created_at
json.numLikes song.likes.length

if song.reposts.length > 0
  json.reposts do
    song.reposts.each do |repost|
      json.set! repost.user_id, repost.created_at
    end
  end
else
  json.reposts ({})
end

json.plays song.plays

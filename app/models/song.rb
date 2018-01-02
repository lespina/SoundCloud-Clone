# == Schema Information
#
# Table name: songs
#
#  id                 :integer          not null, primary key
#  title              :string           not null
#  user_id            :integer          not null

#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime

#  audio_file_name    :string
#  audio_content_type :string
#  audio_file_size    :integer
#  audio_updated_at   :datetime
#

class Song < ApplicationRecord
  validates :title, presence: true

  belongs_to :user
  # styles: { medium: "#300x300", thumb: "100x100>" }
  has_attached_file :image, default_url: "null-image"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  # has_attached_file :audio
  # validates_attachment_content_type :audio, content_type: /\Aimage\/.*\z/
end

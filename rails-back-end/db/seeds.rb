# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Data ..."

# Helper functions
def open_asset(file_name)
  File.open(Rails.root.join('db', 'seed_assets', file_name))
end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

puts "Creating users..."

user1 = User.create!({
  username: 'Alice',
  email: 'a@a.com',
  password: 'a'
})

user2 = User.create!({
  username: 'Bob',
  email: 'b@b.com',
  password: 'b'
})

user3 = User.create!({
  username: 'Kate',
  email: 'k@k.com',
  password: 'k'
})

user4 = User.create!({
  username: 'Xia',
  email: 'dongxiapp@gmail.com',
  password: 'x'
})

puts "Creating wishlists..."

Wishlist.create!({
  name: "Vacation"
})
Wishlist.create!({
  name: "Home"
})
Wishlist.create!({
  name: "Apparel"
})
Wishlist.create!({
  name: "Wedding"
})
Wishlist.create!({
  name: "Baby shower"
})

puts "Creating user-wishlist relationship..."

UserWishlist.create!({
  user_id:1,
  wishlist_id:1
})

UserWishlist.create!({
  user_id:1,
  wishlist_id:2
})

UserWishlist.create!({
  user_id:2,
  wishlist_id:3
})

UserWishlist.create!({
  user_id:3,
  wishlist_id:5
})

puts "Creating products"
Product.create!({
  name:"HUDA BEAUTY The New Nude Eyeshadow Palette",
  url:"https://www.sephora.com/productimages/sku/s2137289-main-Lhero.jpg",
  img_url: "https://www.sephora.com/productimages/sku/s2137289-main-Lhero.jpg",
  price: 85,
  rating: 5,
  note: "note",
  wishlist_id: 1,
  bought: true
})

SiteSelector.create!({
  site_name: "https://www.ikea.com",
  title_tag: "document.getElementsByTagName('title')[0].innerHTML",
  price_tag: "document.getElementsByClassName('product-pip__price__value')[0].innerHTML",
  img_tag: "document.querySelector('#pip-carousel > div > div > div:nth-child(1) > img').src"
})

SiteSelector.create!({
  site_name: "https://www.amazon.ca",
  title_tag: "$('title').html()",
  price_tag: "$('#priceblock_ourprice').html()",
  img_tag: "$('#landingImage').prop('src')"
})

SiteSelector.create!({
  site_name: "https://www.tentree.ca",
  title_tag: "$('h1').html()",
  price_tag: "document.querySelector('#pageContent > div:nth-child(1) > div.container.product-page > div > div.desktop-pull-right.col-md-5 > div.product-info > div.main-product-items > div > span:nth-child(1)').innerHTML",
  img_tag: "$('#product-image-mobileGallery li:nth-child(1) img').prop('src')"
})

SiteSelector.create!({
  site_name: "https://www.lush.ca",
  title_tag: "$('title').html()",
  price_tag: "$('meta[itemprop=\"price\"]').prop('content')",
  img_tag: "$('img[itemprop=\"image\"]').prop('src')"
})



puts "Done!"
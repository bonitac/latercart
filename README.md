# Latercart

A chrome extension that allows the user to create aggregate wishlists while shopping on different websites such as Ikea, Amazon, Tentree and more.

Users can also share their wishlists with other users for a collaborative wishlist for organizing gifts or buying supplies for the office. 



## Screenshots of latercart
- User can view all wishlists, create new wishlists and add proudcts to wishlists through chrome extension.
!["Screenshot of URLs page"](https://github.com/xiadongdev/later-cart/blob/master/docs/add_product.gif?raw=true)

- User can edit product details.
!["Screenshot of URLs page"](https://github.com/xiadongdev/later-cart/blob/master/docs/edit_product.gif?raw=true)

- User can share wishlists with others.
!["Screenshot of URLs page"](https://github.com/xiadongdev/later-cart/blob/master/docs/share_wishlist.gif?raw=true)


## Running the projects

You need **TWO** terminals for this.

In one terminal, `cd` into `react-front-end`. Run `npm install`. Then run `npm start` and go to `localhost:3000` in your browser.

In the other terminal, `cd` into `rails-back-end`. Run `bundle` to install the dependencies. Run `bin/rake db:setup` to create the databases (called rails_project_development by default). Run `bin/rails s` to run the server.

Open up chrome:/More Tools/extensions/ in your browser and click “Developer mode” in the top right. Now click “Load unpacked” and select "latercart_extension". You should now see your extension with an ID in the list. Replace the ID of `editorExtensionId` with the current extension ID on line 32 of react-front-end/public/src/LoginForm.js.

Go to http://localhost:3000/ to view latercart website. To add product, go to any ecommerce website and click on the chrome extension in the top right on a product page, and select wishlist(s) to add to. 


## Tech Stack

- Node.js
- React
- Ruby on Rails
- Postgres
- Material-UI
- Javascript
- jQuery
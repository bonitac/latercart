//get the site_selector info from the db
axios.get('http://localhost:3000/api/site_selectors',
  { params: { site_name: document.location.origin } })
  .then(function (response) {
    let record = response.data[0];
  
    if (record){ 
    var prodname = eval(record.title_tag);
    var prodprice = eval(record.price_tag);
    var prodimg = eval(record.img_tag)
    var produrl = document.location.href
    } else {
    var prodname = $('title').html() ? $('title').html()
                 : $('h1').html() ? $('h1').html()
                 : "not found"
    var prodprice = $('.price').html() ? $('.price').html() 
                 : "not found"
    var prodimg = "not found"
    var produrl = document.location.href
    }

    const product = { name: prodname, price: prodprice, img: prodimg, url: produrl};

    chrome.storage.sync.set({ product: product }, () =>
      console.log("product is set"))
  })
  .catch(function (error) {
    console.log(error);
  });
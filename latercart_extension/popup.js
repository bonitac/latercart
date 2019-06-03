// import product from './getInfo.js'

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
      file: 'jQuery.js'
    });
  chrome.tabs.executeScript(
    tabs[0].id,
    {
      file: 'axios.js'
    });
  chrome.tabs.executeScript(
    tabs[0].id,
    {
      file: 'getInfo.js'
    });
});


setTimeout(() => {

  const popProduct = {}

  chrome.storage.sync.get(['product'], function ({ product }) {

    popProduct.name = product.name
    popProduct.img_url = product.img
    popProduct.price = product.price

    $("#loading").css("display", "none")
    $("#title").html(popProduct.name)
    $("#price").html(popProduct.price)
    $("#img").prop("src", popProduct.img_url)
    $("#confirm").css("display", "inline-block")
    $(".editIcon").css("display", "inline")

    let price_selector_db
    let img_selector_db

    $("#confirm").click(function () {

      let title = $("#title").html()
      let price = $("#price").html()
      let img = $("#img").attr("src")
      let url = product.url


      // intelligence query for price
      if (price !== popProduct.price) {
        chrome.storage.sync.set({ price_input: price }, () =>
          console.log("price_input set"))

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.executeScript(
            tabs[0].id,
            {
              file: 'makePriceQuery.js'
            });
        });

        setTimeout(function () {
          chrome.storage.sync.get(['price_selector'], function ({ price_selector }) {
            price_selector_db = `$("${price_selector}").html()`

          })
        }, 1500);
      }


      if (img !== popProduct.img_url) {
        chrome.storage.sync.set({ img_input: img }, () =>
          console.log("img_input set"))

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.executeScript(
            tabs[0].id,
            {
              file: 'makeImgQuery.js'
            });
        });

        setTimeout(function () {
          chrome.storage.sync.get(['img_selector'], function ({ img_selector }) {
            img_selector_db = `$("${img_selector}").attr('src')`
          })
        }, 1500);
      }
    
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/wishlists',
        headers: { 'Authorization': localStorage.getItem("jwt") }
      })
        .then(response => {
          //generate user lists with checkboxes
          $("#firstPage").css("display", "none")
          $("#lists").append("<ul>Add to List(s)<br><br>")
          response.data.forEach((list) =>
            $("#secondPage ul").append(`<li><input id="${list.id}" type="checkbox" name="${list.name}"> ${list.name}</li>`)
          )
          $('#lists').append('</ul>')
          $("#secondPage").css("display", "block")
          //give user ability to review 
          $("#heart5").click(() => {
            $("#heart5").attr("src", "/images/fullHeart.png")
            $("#heart4").attr("src", "/images/fullHeart.png")
            $("#heart3").attr("src", "/images/fullHeart.png")
            $("#heart2").attr("src", "/images/fullHeart.png")
            $("#heart1").attr("src", "/images/fullHeart.png")
          })

          $("#heart4").click(() => {
            $("#heart5").attr("src", "/images/emptyHeart.png")
            $("#heart4").attr("src", "/images/fullHeart.png")
            $("#heart3").attr("src", "/images/fullHeart.png")
            $("#heart2").attr("src", "/images/fullHeart.png")
            $("#heart1").attr("src", "/images/fullHeart.png")
          })

          $("#heart3").click(() => {
            $("#heart5").attr("src", "/images/emptyHeart.png")
            $("#heart4").attr("src", "/images/emptyHeart.png")
            $("#heart3").attr("src", "/images/fullHeart.png")
            $("#heart2").attr("src", "/images/fullHeart.png")
            $("#heart1").attr("src", "/images/fullHeart.png")
          })

          $("#heart2").click(() => {
            $("#heart5").attr("src", "/images/emptyHeart.png")
            $("#heart4").attr("src", "/images/emptyHeart.png")
            $("#heart3").attr("src", "/images/emptyHeart.png")
            $("#heart2").attr("src", "/images/fullHeart.png")
            $("#heart1").attr("src", "/images/fullHeart.png")
          })

          $("#heart1").click(() => {
            $("#heart5").attr("src", "/images/emptyHeart.png")
            $("#heart4").attr("src", "/images/emptyHeart.png")
            $("#heart3").attr("src", "/images/emptyHeart.png")
            $("#heart2").attr("src", "/images/emptyHeart.png")
            $("#heart1").attr("src", "/images/fullHeart.png")
          })

          console.log($("#title").html())
          console.log(popProduct.name)

          $("#submit").click((e) => {
            e.preventDefault()

            let listIds = []
            let listNames = []
            for (list of $("input[type='checkbox']:checked")) {
              listIds.push(list.id)
              console.log(list)
              listNames.push(list.name)
            }
            let rating = $(".heart[src$='/images/fullHeart.png']").length
            let notes = $("textarea").val()

            listIds.forEach((list) => {
              // code for posting a new product 
              axios.post('http://localhost:3000/api/products',
                { name: title, price: price, img_url: img, wishlist_id: list, rating: rating, note: notes, url: url })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
            })

            console.log(img_selector_db)
            console.log(price_selector_db)
            url = new URL(url)
            url = url.origin
            console.log(url)

            axios.post('http://localhost:3000/api/site_selectors',
              {
                site_name: url,
                title_tag: "$('title').html()",
                price_tag: price_selector_db,
                img_tag: img_selector_db
              })
              .catch(function (error) {
                console.log(error);
              });

            $("#secondPage").css("display", "none")
            $("#thirdPage").css("display", "block")
            console.log(listNames)
            $("#addedProduct").html(`<span>${popProduct.name}</span> has been added to the following list(s):`)
            listNames.forEach((list)=>{
              console.log(list)
              $("#addedLists").append(`<li>${list}</li>`)
              console.log("butts")
            })

              
          })
        })
        .catch(error => {
          console.log(error)
        })
    })
  })


  // function to edit value before confirming a product
  function changeVal(button, field) {
    $(button).click(() => {
      let input = `<form class='edit'><input class='input${+ button}' type='text'></form>`
      $(".editIcon").css("display", "none")
      if (field === "#img") {
        $("#imgForm").html(input)
        $(".edit").submit((e) => {
          e.preventDefault()
          $(".editIcon").css("display", "inline")
          let img_input = $(`.input${+ button}`).val()
          console.log(img_input)
          $("#imgForm").html(`<img id="img" src=${$(`.input${+ button}`).val()}><img id="editImg" class="editIcon" src="/images/pencil.png">`)
        })
      } else {
        $(field).html(input)
        $(".edit").submit((e) => {
          e.preventDefault()
          $(".editIcon").css("display", "inline")
          if (field === "#title") {
            let title_input = $(`.input${+ button}`).val()
            console.log(title_input)
          } else if (field === "#price") {
            let price_input = $(`.input${+ button}`).val()
            console.log(price_input)
          }
          $(field).html($(`.input${+ button}`).val())
        })
      }
    })
  }
  changeVal("#editName", "#title")
  changeVal("#editImg", "#img")
  changeVal("#editPrice", "#price")


  console.log("end of script")
}, 1500)

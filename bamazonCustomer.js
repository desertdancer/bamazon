// import the package
var inquirer = require("inquirer")
require("console.table")

// create the db connection

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {

    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showProducts()
});


// show the db products to the customer 
function showProducts() {

   // console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);

        menu()
    });

}



// ask the customer what they want and how many
function menu() {

    inquirer
        .prompt([
            {
                type:"number",
                name:"id",
                message:"what product you want, please type the ID"
            },
            {
                type:"number",
                name:"q",
                message:"how many "   
            }
            /* Pass your questions in here */
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
           // console.log(answers)
            verifyAndSell(answers)
        });


}

// verify the stock 
function verifyAndSell(prod){

    connection.query("SELECT * FROM products WHERE item_id =" + prod.id, function (err, res) {
        if (err) throw err;
      // console.log(res)

       if (res[0].stock_quantity < prod.q){
          console.log("sorry not enough")
           keepShop()
       }
       else{
          // console.log(res[0].stock_quantity, prod.q)
           prod.q = res[0].stock_quantity - prod.q
         //  console.log(prod)
           updateStock(prod)
           console.log("great the product is on your way")
       }
       
    });


}


function keepShop(){

    inquirer
  .prompt([
  {
      type:"list",
      name:"choice",
      message:"do you want anything else?",
      choices:["Yes","No"]
  }
  ])
  .then(answers => {
   // console.log(answers)
    if(answers.choice==="Yes"){
        showProducts()
    }
    else{
        console.log("bye")
        connection.end()
        process.exit()
    }
  });
}


function updateStock(prod){

  //  console.log("Updating products...\n");

    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: prod.q
        },
        {
          item_id: prod.id
        }
      ],
      function(err, res) {
        if (err) throw err;
       // console.log(res.affectedRows + " products updated!\n");
        keepShop()
    
      }
    );
  
   
  }
  

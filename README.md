# scratch-pay-bank-wire

  An API that calculates and returns the business days past the date after which the settlement will reach the bank account. 
  The API is queryable via HTTP and via Pub/Sub.
  
  EndPoint | Functionality
------------ | -------------
   POST api/v1/businessDates/getBusinessDateWithDelay | returns the business date, number of holidays and weekend between the inital date and business date and the total cumulative number of days to the business date 
   GET api/v1/businessDates/getBusinessDateWithDelay?initialDate=&delay | returns similar data to the api mentioned above
   

The building blocks are:
  * Backend Frameworks - Node JS, ExpressJS
  * Frontend Frameworks - Vanilla Js (No framework used)
  * Package Manager - Yarn
  * Testing - Mocha and Chai

### Getting started
  These instructions will help you get you a copy of the project up and running on your local machine for development and       testing purposes.

### Prerequisites
The only prerequisite to install is Node.js. I use yarn to install and run the application but one can use npm too.

### Installation
This will install all the project's necessary dependancies that are in the manifest file (package.json).
    
    $ yarn install
    
This will get the application up and running. Then open http://localhost:3000/ to see your app.
    
    $yarn start

Run Automated Tests
This will run all automated tests in the application. All the tests are in /test/index.js

    $ yarn test

#### Install Dependencies
* [Node](https://nodejs.org/en/download/)
* [Docker](https://www.docker.com/) (Optional)


Install dependencies:
```
npm -g install protractor
npm install
```

Update driver:
```
webdriver-manager update
```


#### Run

Run using Chrome
```
  protractor protractor.conf.js                                                       
```

Run using Headless
```
  ./protractor-headless.sh protractor.conf.js
```

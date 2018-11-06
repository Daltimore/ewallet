# ewallet
Ewallet REST API

# Steps [without docker]
1. Clone repo and run *cd elasticsearch_js_api* <br/>
2. run *cp .env.sample .env* (update .env appropriately)
2. run *npm install* <br />
3. rum *npm start*

# Steps [with docker]
1. Clone repo and *cd elasticsearch_js_api* <br/>
2. run *cp .env.sample .env* (update .env appropriately or as you see fit)
4. run *docker build -t e-wallet .*
5. run *docker run -d -it --name e-wallet -p 3000:3000 e-wallet* 
6. The 2 commands above are accomplished with docker-compose by executing *docker-compose up*

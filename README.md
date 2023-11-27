# Sentimental Analysis Full Stack Application 
Full stack application for Sentimental Analysis using a custom model, utilizing ReactJS for Frontend, Flask for Backend, MySQL for the database, and tensorflow for the model.

## How to run the application 
1. First we run the flask backend using the following commands. Might look different varying from what type of OS or if you're using a python environment. The flask backend handles things such as distributing tokens, user authentication, interacting with the MySQL and getting information, as well as querying the Custom made AI API that we have made. 
```
$ cd <path of the Sentimental Analysis Folder>/backend
$ export FLASK_APP=base.py
$ python3 -m flask run 
```
2. Run the ReactJS frontend in order to actually see the website. 
```
$ cd <path of the Sentimental Analysis Folder>
$ npm install 
$ npm start
```
3. Website should look like the following: 
![Picture of website working](https://media.discordapp.net/attachments/1153457454772928594/1178530929745068052/image.png?ex=65767b75&is=65640675&hm=2d6909c1883c0e5e6913e797c6e717644b8c40c1ad87e597d999cb59edf4a4a3&=&width=2356&height=1313)
![Picture of Sentimental Analysis page](https://media.discordapp.net/attachments/1153457454772928594/1178531234276712458/image.png?ex=65767bbe&is=656406be&hm=6586cf86d075afb04c6074bac49a2c5df2917f36b012a529b09efd202bfd1362&=&width=2356&height=1313)

---
title: Making money and getting a job offer using Public Data
tags: [react, nextjs, vercel]
date: 2022-12-13T19:25:44.226Z
path: blog/web-app-public-data
cover: ./preview.jpg
excerpt: How to easily create a web app with public data to show off your skills, help you land your next job, and maybe some extra profit.
---

# Overview
In this post we'll look into how you can easily create an interesting website using public data, that you can then monitise and use to impress future employers!
You'll learn why you should be building a personal project using public data, and you'll be walked through an example of building an app that utilises public data from scratch all the way to deployment with its own domain.

# Why should I create my own personal project?
Developers often create personal projects for a variety of reasons, some of these are:
- To show off to future employers that they know what they are doing
- To learn a new technology
- For fun
- For profit
These don't have to be mutually exclusive, often you can build a project that hits all of these!

As well, if you're looking to break into the software industry then building up your portfolio by creating personal projects is one of the best ways to land a job.

# Why should I use public data?
If you're looking for ideas for projects then public data can be a great place to look for inspiration.  
Public data is easy to get hold of, is free(!), and can be combined with other data to provide massive value to users.  

Often public data isn't presented in a user-friendly format, so even just presenting data in a way that users can understand can be a big win and not very complicated.

Some examples of sources of public data:
- government (which we'll see an example of later)
  - health data, e.g. number of vaccinations in England can be found [here](https://coronavirus.data.gov.uk/details/vaccinations?areaType=nation&areaName=England).
  - tax data, e.g. Council tax statistics can be found [here](https://www.gov.uk/government/statistical-data-sets/live-tables-on-council-tax).
- Video games
  - Popular online video games have their own APIs such as the World of Warcraft API, which can be found [here](https://develop.battle.net/documentation/world-of-warcraft/game-data-apis).
  - Some games have community-run APIs such as the PokéAPI for Pokémon, which can be found [here](https://pokeapi.co/).

These are just a few examples. You could also scrape data from websites if they don't offer a nice way to get their data, depending on their data usage policies, however that deserves its own separate post. 
If you're interested in web scraping, you can find a tutorial [here](https://www.freecodecamp.org/news/web-scraping-python-tutorial-how-to-scrape-data-from-a-website/) from FreeCodeCamp.

The best data to pick is what is most interesting to you, or that solves a particular problem that you're facing. That way you're much more likely to stick with the project!

# Creating a Website that shows the driving tests centres with the best pass rates near you
Here we'll walk through a step-by-step guide on how we can build a website that allows users to search for driving test centres near them and show which has the best pass rates.  
We'll be using the UK Government's public data on driving test centre pass rates.  
I built this because I'm looking to learn to drive and I wanted to see which test centre I'd have the best chance with!

Let's set out the requirements:
- The user can see the best driving test centres around them, based on their postcode.
- The user can see the best driving test centres around popular cities.
- The user can see the Google Reviews rating for each test centre.
- The user can easily see where the test centre is located on Google Maps

And with that, let's get started!

## Setting up the app
For this application we'll be using Next.JS as the framework and Material UI for the design.  
If you haven't used Next.JS before don't worry. If you've ever used React before then the majority of it will be clear.

The reason that I used Next.JS was for its static site generation, which makes it lightning fast. 
Most of the data that I use here is not dynamic, which means that we can generate our pages at build time.
Not only does this make the application load extremely fast, it's also good for SEO (Search Engine Optimisation) 
which is very important if we want to monitise our application later.  
Next.JS has a good intro on SEO which can be found [here](https://nextjs.org/learn/seo/introduction-to-seo).  
It's also very easy to host, which we'll see later.

Throughout this post we'll see how we can use Next.JS for static site generation, however you can read more about Next.JS [here](https://nextjs.org/docs/getting-started).

- NextJs Typescript starter
- Material UI

To start, lets initialise our project:
```bash
> npx create-next-app@latest --ts
```
Once this has completed we can start up our application by running:
```bash
npm run dev
```

Opening localhost:3000 should then show us the Next.js example page:  
![](./resources/example-page.png)

## Getting the Data

### Getting the test centre data
Please note that in this section I'll be deliberately brief on the details. 
This is partly because the point of this post isn't to copy what I did entirely, but rather to provide inspiration, 
but also because I don't want this post to be any longer than it needs to be. I leave the massaging of data as an exercise for the reader.

Before we get into building our web app, we'll need to get the driving test centre data.  
We can download this from the gov.uk's page on driving test pass rates [here](https://www.gov.uk/government/statistical-data-sets/car-driving-test-data-by-test-centre),
and selecting the "Car pass rates by gender, month and test centre" document.

This document contains a tab for each year, with a record of the total pass rate for all men and women that year for each driving test centre.
![](./resources/test-data.png)

As an example, we can see that Aberdeen North had a total pass rate of 48.2% for the year 2022-23.  
You can use your favourite scripting language to pull this data out, you'll need to get a list of each test centre name with its total pass rate.  

### Getting the location data for each test centre
In order to calculate the distance from the user to each test centre we'll need to find the location of each test centre. 
One way to do this is to use the Google Maps Places API. 
Whilst the API is not free it does include 28,500 free map-loads per month, which will be much more than what we need.

Before we can use the Places API, we'll need to get our own API key. The instructions for this can be found [here](https://developers.google.com/maps/documentation/javascript/get-api-key).

The API that we'll need is the Places API, specifically the `findplacefromtext` and `details` endpoints. 

We'll use these endpoints to get the following fields:
- geometry: The longitude and latitude of the test centre location 
- rating: The Google reviews rating for the location
- user_ratings_total: The total number of reviews left for the location
- url: The link to the location in Google Maps.

We can use the `findplacefromtext` endpoint to first search for our test centres by name, and get back the possible candidates with their name and place ID.  
For example, when searching for Mill Hill (London) driving test centre, we can query the following:
https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Mill%20Hill%20(London)%20Driving%20Test%20Centre&inputtype=textquery&key=<YOUR API KEY>&locationbias=ipbias&fields=name,place_id
Which returns:
```json
{
  "candidates": [
    {
      "name": "Mill Hill Driving Test Centre",
      "place_id": "ChIJXdhrutoWdkgRh_OPEmlGwmc"
    }
  ],
  "status": "OK"
}
```

We can then use that place ID to find all the details about that test centre:
https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJXdhrutoWdkgRh_OPEmlGwmc&key=<YOUR API KEY>&fields=geometry,rating,url,user_ratings_total
Which returns:
```json
{
  "html_attributions": [],
  "result": {
    "geometry": {
      "location": {
        "lat": 51.6103168,
        "lng": -0.2469914999999999
      },
      "viewport": {
        "northeast": {
          "lat": 51.6115767802915,
          "lng": -0.2457076697084979
        },
        "southwest": {
          "lat": 51.6088788197085,
          "lng": -0.248405630291502
        }
      }
    },
    "rating": 4.7,
    "url": "https://maps.google.com/?cid=7476615748485378951",
    "user_ratings_total": 350
  },
  "status": "OK"
}
```

For test centres where I got more than one candidate I hand-picked the right one - however you could write your own algorithm to programmatically figure this out.

### Combining the data
We then want to combine this data to get a list of all the test centres with their name, pass rate, lat long, rating, number of ratings, and the Google Maps URL.  
We should then save this in a JSON file, which should look like this:
```json
[
  {
    "name": "Aberdeen North",
    "passRate": "57.3",
    "mapDetails": {
      "lat": 57.1856443,
      "lng": -2.0964023,
      "rating": 4.1,
      "url": "https://maps.google.com/?cid=5779616227159057902",
      "userRatingsTotal": 7
    }
  },
  {
    "name": "Aberdeen South (Cove)",
    "passRate": "64.5",
    "mapDetails": {
      "lat": 57.0884979,
      "lng": -2.1077442,
      "rating": 4.3,
      "url": "https://maps.google.com/?cid=10499189161470180622",
      "userRatingsTotal": 19
    }
  },
  ...
]
```

### Getting the location data for each city
One of the requirements is for users to be able to select the best test centres near a city. 
To do this we need to find the location of each city

The fields that we'll need to retrieve are:
- 
As an example, here 

- Pulling the data from gov uk
- Pulling google maps data

### Manipulating the data
- writing a script to manipulate the data
- Combined with google maps data
- Show example of city data

### Adding the data to our web app


## Setting up the landing page
Before we get started on our landing page, lets install Material UI:
```bash
> npm install @mui/material
> npm install @mui/icons-material
```

## Picking Images for the app
- unsplash
- flaticon

- HTML for landing page
- Nothing except header
- Add document with logo etc.

## Showing static results for each city
- add data to nextjs
- Add id page

### List all cities on one page

### Add link on landing page

### Add a list of top cities to the landing page

## Allow users to search for test centres within their radius
- calculate radius
- build pass-rates page

### Add pass rates page

### Add search bar to landing page

## Adding a sitemap
- next-sitemap

## Deploy the application
- vercel intro
- walkthrough deploying via Vercel from github repo

## Optional: Buy a domain name
- Google domains
- Link domain to app in vercel.
- Set up email forwarding

## Optional: Tweet it!
- benefits of tweeting
### Add twitter card
- Code in document file
- Check that it works?
- Show how it will appear in twitter

## Optional: Monitise your app with google ads
- Walk through adding google scripts
- Walk through adding app through google ads website

## Optional: Add google analytics to track users on your website
- walkthrough adding app
- Show screenshot of my analytics dashboard
- scripts to add

### Adding a privacy policy
- GDPR with google
- find website used to make privacy policy
- show how to add it in google adds and app

## Demo own project
- Link to website
- GitHub repo

# Conclusion
- Link to website
- GitHub repo
- Give conclusion on what they learned.
- Extensions, tests, etc.?
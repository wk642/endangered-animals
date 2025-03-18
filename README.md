# [![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=5000&center=true&vCenter=true&multiline=true&lines=ENDAGERED+ANIMAL+SIGHTING+TRACKER)](https://git.io/typing-svg)
###### attribution this typewriting animation to :
- [ ] [Readme Typing SVG](https://readme-typing-svg.demolab.com/demo/?weight=600&size=30&pause=5000&center=true&vCenter=true&multiline=true&width=500&lines=ENDAGERED+ANIMAL+SIGHTING+TRACKER)
- [ ] [Readme Typing SVG gitHub](https://github.com/DenverCoder1/readme-typing-svg?tab=readme-ov-file)

attribution to font color in this readme:
- [ ] [Markdown color text](https://github.com/orgs/community/discussions/31570)
- [ ] [CSS in markdown](https://lifelongprogrammer.blogspot.com/2019/01/how-to-style-markdown-with-css.html)

## TABLE OF CONTENTS 
1. [OBJECTIVES](#objectives)
2. [PREREQUISITES](#prerequisites)
3. [DEMO](#demo)
4. [SETUP INSTRUCTIONS](#setup)
5. [MY JOURNEY](#journey)
6. [NICE TO HAVES](#nice)
7. [SPIKE DOC](#spike)

## OBJECTIVES <a name="objctivies"></a>
This app is going to help scientists track sightings of endangered animals. There will be a tracker of different spieces, and it's individuals plus the sightings of the endangered animals.

## PREREQUISITES <a name="prerequisites"></a>
- [ ] psql
- [ ] express
- [ ] concurrenlty
- [ ] testing
- [ ] SQL
## DEMO <a name="demo"></a>

## SETUP INSTRUCTIONS <a name="setup"></a>
1. In your terminal `cd` into the location you want to clone my project in
2. Type: `git clone https://github.com/wk642/endangered-animals.git`
3. Go into my folder `cd endagered-animals.git`
4. Remove my github info `rm -rf .git`
5. Remove the connection
  5.a. If you see a fetch and push link as `https://github.com/wk642/endangered-animals.git` then you need to type `git remote remove origin main`
  5.b. If you want to connect to your own github, this is where you would do it, if not you you can ignore step 5.b.
6. If you're using vscode, in  your teminal type `code .`
7. Now that you are in vscode, open up the termianl or press `command + j`
8. Install npm `npm install`
9. To make sure that you can run the front end `npm run dev`

## MY JOURNEY <a name="journey"></a>
- [x] Create app using REACT / VITE / [JEST](https://gist.github.com/wk642/502cf733b63686c07140e9a84631edc4)
- [ ] Install the following
  - [x] npm
  - [x] express
  - [x] nodemon
  - [x] concurrently
  - [x] cors
  - [ ] pg 
- [ ] Have a pg_dump file named db.js set up

- [ ] DATA SCHEMAS: 
| SPIECES | INDIVIDUALS | SIGHTINGS|
| --- | --- | ---|
| `id` : Primary Key, Serial |`id` : Primary Key, Serial | `id` : Primary Key, Serial |
| `common_name` : VARCHAR | `individual_nickname` : VARCHAR | `sighting_date_time` : DATETIME|
| `scientific_name` : VARCHAR | `speicies` : VARCHAR | `individually_seen` : BOOLEAN|
|  `population` : Number | `individuals_record_creation_timestamp` : timestamp [ (p) ] with time zone | `sighting_location` : VARCHAR |
| `conservation_code` : VARCHAR |  | `animal_health` : BOOLEAN|
| `species_record_creation_timestamp` : timestamp [ (p) ] with time zone | |`sighter_email` : VARCHAR |
| | | `sightings_record_creation_timestamp` : timestamp [ (p) ] with time zone |

- [ ] Base database will have at least: 
  - [ ] 3 animal species 
  - [ ] 2 individuals of each species
  - [ ] least 5 animal sightings.

- [ ] Components:
  - [ ] NewSightingForm
  - [ ] NewIndividualForm
  - [ ] NewSpeiciesForm

- [ ] Routes:
  - [ ] GET - displaying data
  - [ ] POST - when adding from forms
  - [ ] DELETE

## NICE TO HAVES <a name="nice"></a>

## SPIKE DOC <a name="spike"></a>
- [ ] readme table style does not work on github
- [ ] does psql database come with automatic timestamps already

<!-- <style>
  table{
    border: 6px solid black;
    width: 100%;
  }
  th:nth-child(1){
    background-color: blue;
    justify-content: center;
  }
  th:nth-child(2){
    background-color: green;
    justify-content: center;
  }
  th:nth-child(3){
    background-color: red;
    justify-content: center;
  }
  td:nth-child(1){
    background-color: #000080;
    color: white;
    /* width: 30%; */
  }
  td:nth-child(2){
    background-color: #006400;
    color: white;
    /* width: 30%; */
  }
  td:nth-child(3){
    background-color: #8B0000;
    color: white;
    /* width: 30%; */
  }
</style> -->
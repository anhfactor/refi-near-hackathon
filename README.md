# ReFi - Financing the Energy Transition - NEAR MetaBUILD Hackathon

ReFi - Financing the Energy Transition. We are bridging the renewable energy world with DeFi. We are making investments in renewable energy projects efficient, inclusive, and accessible to everyone. 
- Devpost link: https://devpost.com/software/refi-financing-the-energy-transition.  
- Demo video: https://www.youtube.com/watch?v=bCb_VXR10pM&feature=emb_imp_woyt

## Table of Contents
* [Problem](#problem)
* [Inspiration](#inspiration)
* [Our response and what we want to achieve](#our-response-and-what-we-want-to-achieve)
* [What it does](#what-it-does)
* [How we built it and setup](#how-we-built-it-and-setup)
* [Challenges we ran into](#challenges-we-ran-into)
* [Accomplishments that we're proud of](#accomplishments-that-were-proud-of)
* [What we learned](#what-we-learned)
* [What's next for ReFi - Financing the Energy Transition](#whats-next-for-refi---financing-the-energy-transition)


## Problem
From the global perspective, we need to invest annually 1 (one) trillion USD to achieve CO2-Neutrality.  

## Inspiration
How can NFTs, tokenisation of assets and DeFi mobilise private funding, and how can we channel alternative funding sources for financing the energy transition? 

## Our response and what we want to achieve
We are working at the intersection of blockchain technology and renewable energies. We are developing a solution for connecting renewable energy production units (physical asset) with NEAR aiming to create a digital representation of these physical assets on-chain. We are implementing the concept of fractional ownership of a physical asset (pv-system) on Aurora network. 

## What it does
For this hackathon we created a prototype that demonstrates how a peer-to-peer green capital marketplace baked by renewable energy could be implemented. NFTs (digital assets) represent ownership of PV-systems that can be fractionalised. Fractions (PVF) are ERC20 tokens that can be swaped to other tokens, traded, use them for lending and borrowing. In that way, we increase liquidity of investing in PV-systems significantly.  

## How we built it and setup
On a miro board using mind-map we started defining the main concept of the prototype (back- and frontend). We agreed on the storyline and value flows. For the frontend, we created mock-ups with the main functionalities, defined dependencies and the deployment tools needed. We introduced sandboxes as possible solutions and discussed their implementation.
   
For the frontend, we created a template build with NextJS, TailwindCSS and implemented the main navigation according to our scenario. We created a frontend demo script for testing the deployment process and proper functionality of our prototype. 

<center>**If you want to use our DApp use our [Faucet](https://refi-near-hackathon.vercel.app/) then you can mint and NFT, tokenize it using the fractional function. Finally, you can use the fractions for swaping and lending**.</center>

### Contracts - Build & deploy this to aurora testnet first

- See [contracts README](./contracts/README.md)

### Method 1: Build it as a seperate service for frontend and backend (we are using this for demo)
### Frontend

Start with `cd frontend && yarn dev`
* Demo in vercel: https://refi-near-hackathon.vercel.app/

### Backend

Start with `cd backend && yarn start`
* Demo in heroku: https://refi-backend.herokuapp.com/

### Method 2: Start with docker container

Use the Makefile in the root folder. 

**Commands**

- Setup with `make setup`
- Start `make start`
- Stop `make stop`
- Status `make status`
- Logs `make logs`

### Documentation

- Documentation is available in the [docs](./docs) folder

  
## Challenges we ran into
The main challenge was to shrink the gap of knowledge among team members and make sure that communication of tasks is successful. We introduced step-by-step instructions for using the different smart-contracts for fractionalise, swap and borrowing/lending. Based on this instruction, the smart contacts have been tested and the deployment scripts developed.

## Accomplishments that we're proud of
This prototype has been created from a virtual team almost from scratch and 100% online. Despite the different time zones, time constraints and  the perceived high complexity of our project, we were able to develop a functioning solution.  

## What we learned
Testing, Testing, Testing

##References
<p></p>
*[1] [Renewable Energy in Cities Status Report 2021](https://www.ren21.net/wp-content/uploads/2019/05/REC_2021_full-report_en.pdf)*
<p></p>
*[2] [Investment and financing needed
for Switzerland to reach net-zero by 2050](https://www.swissbanking.ch/en/news-and-positions/press-releases/net-zero-by-2050-climate-target-requires-annual-investments-of-chf-12-9-bn)*
<p></p>
*[3] [Transforming Climate Finance and Green Investment with Blockchain Technology, 2018](https://www.sciencedirect.com/book/9780128144473/transforming-climate-finance-and-green-investment-with-blockchains#book-description)* 
<p></p>
*[4] [C40 announcement at Global Climate Action Summit, 2018](https://c40-production-images.s3.amazonaws.com/other_uploads/images/1670_C40_UCAIF_report_26_Feb_2.original.pdf?1521042661)*
<br></br>

## What's next for ReFi - Financing the Energy Transition
We want to create a DAO and finance our project. We will work on the following tasks : 
We have to work on our backend solution and adding additional functionalities of ReFi, error handling and test out the application. Additionally, we will work on following ReFi related projects:
<p></p>
* Connecting electricity smart-meters with NEAR and creating a registry of energy production units.
* Creating a valuation of PV-systems based on an algorithm and an oracle for providing the value to ReFi protocol.  

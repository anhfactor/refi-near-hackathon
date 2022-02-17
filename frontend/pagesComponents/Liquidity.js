import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';
import React, { useEffect, useState } from 'react'
import { approveLending, supplyLending, borrow, redeem } from "../helper/Lending"

export default function Liquidity(props) {
    const [openTab, setOpenTab] = React.useState(1);

    const [supplyValue, setSupplyValue] = React.useState("");
    const [borrowValue, setBorrowValue] = React.useState("");
    const [redeemValue, setRedeemValue] = React.useState("");

    const handleChange = {
        supplyValue: (e) => {
          setSupplyValue(e.target.value);
        },
        borrowValue: (e) => {
          setBorrowValue(e.target.value);
        },
        redeemValue: (e) => {
          setRedeemValue(e.target.value);
        },
      };
    
      async function _supply() {
        if (supplyValue != "") {
          await approveLending(supplyValue)
          await supplyLending(supplyValue)
        } else
          alert("Please enter amount supply")
      }
    
      async function _borrow() {
        if (borrowValue != "") {
          await borrow(borrowValue)
        } else
          alert("Please enter amount borrow")
    
      }
    
      async function _redeem() {
        if (redeemValue != "") {
          await redeem(redeemValue)
        } else
          alert("Please enter amount redeem")
    
      }
    return(
        <>
           <div className="w-full">
                    <ul
                      className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                      role="tablist"
                    >
                      <li className="flex-auto text-center">
                        {openTab === 1 ? 
                            <Button
                                color="lightBlue"
                                size="lg"
                                ripple="dark"
                                onClick={e => {
                                    e.preventDefault()
                                    setOpenTab(1);
                                }}
                            >
                            <i class="fas fa-coins"></i> Supply
                            </Button> : 
                                <Button
                                color="lightBlue"
                                buttonType="outline"
                                size="lg"
                                ripple="dark"
                                onClick={e => {
                                    e.preventDefault()
                                    setOpenTab(1);
                                }}
                            >
                            <i class="fas fa-coins"></i> Supply
                        </Button>}
                      </li>
                      <li className="flex-auto text-center">
                          {openTab === 2 ? 
                            <Button
                                color="lightBlue"
                                size="lg"
                                ripple="dark"
                                onClick={e => {
                                    e.preventDefault()
                                    setOpenTab(2);
                                }}
                            >
                            <i class="fas fa-hand-holding-usd"></i>  Borrow
                            </Button> : 
                                <Button
                                color="lightBlue"
                                buttonType="outline"
                                size="lg"
                                ripple="dark"
                                onClick={e => {
                                    e.preventDefault()
                                    setOpenTab(2);
                                }}
                            >
                            <i class="fas fa-hand-holding-usd"></i>  Borrow
                        </Button>}
                      </li>
                      <li className="flex-auto text-center">
                        {openTab === 3 ? 
                            <Button
                                color="lightBlue"
                                size="lg"
                                ripple="dark"
                                onClick={e => {
                                    e.preventDefault()
                                    setOpenTab(3);
                                }}
                            >
                          <i class="fas fa-wallet"></i>  Redeem
                            </Button> : 
                                <Button
                                color="lightBlue"
                                buttonType="outline"
                                size="lg"
                                ripple="dark"
                                onClick={e => {
                                    e.preventDefault()
                                    setOpenTab(3);
                                }}
                            >
                          <i class="fas fa-wallet"></i>  Redeem
                        </Button>}
                      </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                      <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space text-center">
                          <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                            <p>
                              How much do you want to deposit / supply?
                              <br />
                              (min. amount is 1 eEUR)
                              <br />
                              Type collateral amount (supply eEUR) - receive ReEUR
                            </p>
                            <br />
                            <div class="relative flex w-full flex-wrap items-stretch mb-3">
                              <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                <i class="fas fa-dollar-sign"></i>
                              </span>
                              <input type="text" placeholder="Amount ..." class="px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                                value={supplyValue}
                                onChange={handleChange.supplyValue}
                              />
                            </div>
                            <Button
                                color="lightBlue"
                                size="lg"
                                ripple="dark"
                                onClick={_supply}
                                >
                                Deposit
                            </Button>
                          </div>
                          <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                            <p>
                              Do you want to borrow tokens?
                              <br />
                              (You'll get 90% of collateral, in Tokens)
                              <br />
                              Type collateral amount (receive eEUR)
                            </p>
                            <br />
                            <div class="relative flex w-full flex-wrap items-stretch mb-3">
                              <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                <i class="fas fa-dollar-sign"></i>
                              </span>
                              <input type="text" placeholder="Amount ..." class="px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                                value={borrowValue}
                                onChange={handleChange.borrowValue}
                              />
                            </div>
                            <Button
                                color="lightBlue"
                                size="lg"
                                ripple="dark"
                                onClick={_borrow}
                                >
                                Borrow
                            </Button>
                          </div>
                          <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                            <p>
                              Redeem
                              <br />
                              <br />
                              Type collateral amount (receive ReEUR)
                            </p>
                            <br />
                            <div class="relative flex w-full flex-wrap items-stretch mb-3">
                              <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                <i class="fas fa-dollar-sign"></i>
                              </span>
                              <input type="text" placeholder="Amount ..." class="px-3 py-3 placeholder-blueGray-400 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                                value={redeemValue}
                                onChange={handleChange.redeemValue}
                              />
                            </div>
                            <Button
                                color="lightBlue"
                                size="lg"
                                ripple="dark"
                                onClick={_redeem}
                                >
                                Redeem
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        </>
    );
}

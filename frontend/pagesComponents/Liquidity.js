import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';
import Tab from "components/Tab/Tab";
import TabList from "components/Tab/TabList";
import TabItem from "components/Tab/TabItem";
import TabContent from "components/Tab/TabContent";
import TabPane from "components/Tab/TabPane";
import React, { useEffect, useState } from 'react'

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
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 1
                              ? "text-lightBlue bg-lightBlue-600"
                              : "text-lightBlue-600 bg-white")
                          }
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(1);
                          }}
                          data-toggle="tab"
                          href="#link1"
                          role="tablist"
                        >
                          <i class="fas fa-coins"></i> Supply
                        </a>
                      </li>
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 2
                              ? "text-white bg-lightBlue-600"
                              : "text-lightBlue-600 bg-white")
                          }
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(2);
                          }}
                          data-toggle="tab"
                          href="#link3"
                          role="tablist"
                        >
                          <i class="fas fa-hand-holding-usd"></i>  Borrow
                        </a>
                      </li>
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 3
                              ? "text-white bg-lightBlue-600"
                              : "text-lightBlue-600 bg-white")
                          }
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(3);
                          }}
                          data-toggle="tab"
                          href="#link3"
                          role="tablist"
                        >
                          <i class="fas fa-wallet"></i>  Redeem
                        </a>
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
                            <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={_supply}
                            >
                              Deposit
                            </button>
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
                            <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={_borrow}
                            >
                              Borrow
                            </button>
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
                            <button className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={_redeem}
                            >
                              Redeem
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        </>
    );
}

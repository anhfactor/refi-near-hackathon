import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';
import Heading5 from 'components/Typography/Heading5'
import React, { useEffect, useState } from 'react'
import { getAmountOut, approveSwap, swapTokens } from "../helper/Swap"

export default function Swap(props) {
    // Stores the current value of their respective text box
    const [field1Value, setField1Value] = React.useState("");
    const [field2Value, setField2Value] = React.useState("");

    // Stores data about their respective coin
    const [coin1, setCoin1] = React.useState({
        address: process.env.NEXT_PUBLIC_FRACTIONALISER,
        symbol: "PVF",
    });
    const [coin2, setCoin2] = React.useState({
        address: process.env.NEXT_PUBLIC_STABLECOIN,
        symbol: "eEUR",
    });
    const handleChange = {
        field1: (e) => {
          setField1Value(e.target.value);
        },
        field2: (e) => {
          setField2Value(e.target.value);
        },
      };
    async function switchToken() {
        setCoin1(coin2);
        setCoin2(coin1);
        setField1Value("");
    }
    async function swapToken() {
        if (field1Value != "") {
          await approveSwap(coin1.address, field1Value);
          await swapTokens(coin1.address, coin2.address, field1Value, field2Value)
        }
        else
          alert("Please input amount")
      }
    // This hook is called when either of the state variables `field1Value` `coin1.address` or `coin2.address` change.
    // It attempts to calculate and set the state variable `field2Value`
    // This means that if the user types a new value into the conversion box or the conversion rate changes,
    // the value in the output box will change.
    useEffect(() => {
        if (isNaN(parseFloat(field1Value))) {
        setField2Value("");
        } else if (parseFloat(field1Value) && coin1.address && coin2.address) {
        getAmountOut(coin1.address, coin2.address, field1Value).then(
            (amount) => setField2Value(amount)
        );
        } else {
        setField2Value("");
        }
    }, [field1Value, coin1.address, coin2.address]);
    return(
        <>
            <CardBody>
                <div className="flex justify-center">
                    <Heading5>Swap your PVF</Heading5>
                </div>
                    <div class="relative flex w-full flex-wrap items-stretch">
                    <span class="z-10 h-full leading-snug font-normal absolute text-center absolute bg-transparent rounded text-base items-center justify-center font-bold pl-3 py-3">
                        {coin1.symbol}
                    </span>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={field1Value}
                        onChange={handleChange.field1}
                        style={{ textAlign: "right" }}
                        placeholder="0.0"
                    />
                    </div>
                    <div className="flex flex-wrap">
                    <div className="w-full flex-1">
                    </div>
                    <div className="w-6/12 flex-1">
                        <button className="background-transparent font-bold uppercase px-12 py-1 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={switchToken}
                        >
                        <i className="fa fa-sync"></i>
                        </button>
                    </div>
                    <div className="w-full flex-1">
                    </div>
                    </div>
                    <div class="relative flex w-full flex-wrap items-stretch">
                    <span class="z-10 h-full leading-snug font-normal absolute text-center absolute bg-transparent rounded text-base items-center justify-center font-bold pl-3 py-3">
                        {coin2.symbol}
                    </span>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={field2Value}
                        onChange={handleChange.field2}
                        style={{ textAlign: "right" }}
                        placeholder="0.0"
                    />
                    </div>
            </CardBody>
            <CardFooter>
                <div className="flex justify-center">
                    <Button
                        color="lightBlue"
                        size="regular"
                        ripple="dark"
                        onClick={swapToken}
                    >
                        Swap
                    </Button>
                </div>
            </CardFooter>
        </>
    );
}

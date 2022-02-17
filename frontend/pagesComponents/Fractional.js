import { React, useEffect, useState } from 'react'
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';
import Select from 'react-select'
import axios from 'axios'
import { fractionalise } from "../helper/Fractionaliser.js"
import { approveNFT } from "../helper/OwnerShipCreator.js"
import { approveFund } from "../helper/StableCoin.js"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api'

export default function Fractional(props) {
    const [tokens, setTokens] = useState([])
    const [nfts, setNfts] = useState([{ value: -1, label: "No items" }])
    const [nftFraction, setNftFraction] = useState(null) // select nft for fraction
    const [phase, setPhase] = useState(1) // phase for fractionalise

    useEffect(() => {
        if (tokens && tokens.length) return
        axios.get(`${baseUrl}/`).then(({ data }) => {
          setTokens(data)
          loadNFTs(data)
        })
      }, [])
      
      async function loadNFTs(data) {
        try {
          const items = await Promise.all(data.map(async i => {
              return {
                value: i.number,
                label: i.name,
                description: i.description,
                image: i.image,
                owner: i.address
              }
          }))
          setNfts(items)
          setLoadingState('loaded')
          console.log(items)
        } catch (err) {
    
    
        }
      }
    
      async function _approveNFT() {
        if (nftFraction == null) {
          alert("Please choose NFT")
        } else {
          const tokenId = nftFraction.value
          console.log(`#${tokenId} approve NFT`)
          const result = await approveNFT(tokenId)
          console.log(result)
        }
      }
    
      async function _approveFund() {
        if (nftFraction == null) {
          alert("Please choose NFT")
        } else {
          const fundAmount = 10000000
          console.log(`#${fundAmount} approve Fund`)
          const result = await approveFund(fundAmount)
          console.log(result)
        }
      }
    
      async function _fractionalise() {
        if (nftFraction == null) {
          alert("Please choose NFT")
        } else {
          const fractionAmount = 1000000000000 // 10000 Fraction
          const tokenId = nftFraction.value
          console.log(`${tokenId} fraction ${fractionAmount}`)
          const result = await fractionalise(tokenId, fractionAmount)
          console.log(result)
        }
      }

    return(
        <>
            <CardBody>
                <div className="mb-16">
                    <Select
                        defaultValue={nftFraction}
                        placeholder="Please select your NFT"
                        onChange={setNftFraction}
                        options={nfts}
                    />
                </div>
                <div className="">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="AmountFractions x FractionalisationFee"
                        disabled
                        value="10000"
                    />
                </div>
            </CardBody>
            <CardFooter>
                <div className="flex justify-center">
                    {phase === 1 ? 
                        <Button
                            color="lightBlue"
                            className="mr-2"
                            size="sm"
                            ripple="dark"
                            onClick={e => {
                                e.preventDefault()
                                setPhase(1)
                                _approveNFT()
                              }}
                        >
                            <i className="fa fa-cube text-base mr-1"></i> Approve NFT
                        </Button> : 
                            <Button
                            color="lightBlue"
                            buttonType="outline"
                            className="mr-2"
                            size="sm"
                            ripple="dark"
                            onClick={e => {
                                e.preventDefault()
                                setPhase(1)
                                _approveNFT()
                              }}
                        >
                            <i className="fa fa-cube text-base mr-1"></i> Approve NFT
                    </Button>}
                    {phase === 2 ? 
                        <Button
                            color="lightBlue"
                            className="mr-2"
                            size="sm"
                            ripple="dark"
                            onClick={e => {
                                e.preventDefault()
                                setPhase(2)
                                _approveFund()
                              }}
                        >
                        <i className="fa fa-credit-card text-base mr-1"></i> Approve Fund
                        </Button> : 
                            <Button
                            color="lightBlue"
                            buttonType="outline"
                            className="mr-2"
                            size="sm"
                            ripple="dark"
                            onClick={e => {
                                e.preventDefault()
                                setPhase(2)
                                _approveFund()
                              }}
                        >
                        <i className="fa fa-credit-card text-base mr-1"></i> Approve Fund
                    </Button>}
                    {phase === 3 ? 
                        <Button
                            color="lightBlue"
                            className="mr-2"
                            size="sm"
                            ripple="dark"
                            onClick={e => {
                                e.preventDefault()
                                setPhase(3)
                                _fractionalise()
                              }}
                        >
                        <i className="fas fa-briefcase text-base mr-1"></i> Fractionalise
                        </Button> : 
                            <Button
                            color="lightBlue"
                            buttonType="outline"
                            className="mr-2"
                            size="sm"
                            ripple="dark"
                            onClick={e => {
                                e.preventDefault()
                                setPhase(3)
                                _fractionalise()
                              }}
                        >
                        <i className="fas fa-briefcase text-base mr-1"></i> Fractionalise
                    </Button>}
                </div>
            </CardFooter>
        </>
    );
}

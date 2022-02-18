import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';
import  { React, useEffect, useState } from 'react'
import axios from 'axios'
import { mint, getNextId } from '../helper/OwnerShipCreator'
import Textarea from 'components/Textarea/Textarea'

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api'

export default function Mint(props) {
    const [tokenId, setTokenId] = useState(""); // get next token ID on chain
    const [tokens, setTokens] = useState([])

    useEffect(async () => {
        if (tokens && tokens.length) return
        await axios.get(`${baseUrl}/`).then( async ({ data }) => {
          setTokens(data)
          console.log(data)
          var nextId = (await getNextId()).toString()
          setTokenId(nextId)
          console.log(`Next token #${nextId}`)
        })
    }, [])

    useEffect(() => {
    if (!tokens) return
    setContract({
        ...contract,
        number: tokenId,
        address: props.address,
    })
    }, [tokens])

    const [account, setAccount] = useState({
        account: '',
        address: '',
        balance: ''
      })
      const contractDefault = () => ({
        address: '',
        number: 0,
        image: `${baseUrl}/certificates/picture.png`
      })
      const [contract, setContract] = useState(contractDefault())

    const createContract = async (e) => {
        e.preventDefault()
        if (!props.address) return
        contract.address = props.address.toLowerCase()
        contract.number = tokenId
    
        console.log(`id#${contract.number} form data`, contract)
    
        const tokenURI = await mint(props.address, contract.number)
        console.log(`id#${contract.number} minted contract`)
    
        const metadata = await axios.post(`${baseUrl}/${contract.number}`, contract)
        console.log(`id#${contract.number} created metadata`, metadata)
    
        window.location.href = '/assets'
    
      }
    return(
        <>
            <CardBody>
                <div className="mb-5">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="Enter Certificate ID *"
                        iconName="fa-id-badge"
                        iconFamily="font-awesome"
                        disabled
                        value={tokenId}
                    />
                </div>
                <div className="mb-5">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="Asset Name *"
                        value={contract.name}
                        onChange={(e) => contract.name = e.currentTarget.value}
                    />
                </div>
                <div className="mb-5">
                    <Textarea
                        color="lightBlue"
                        size="sm"
                        outline={true}
                        placeholder="Asset Description *"
                        value={contract.description}
                        onChange={(e) => contract.description = e.currentTarget.value}
                    />
                </div>
                <div className="">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="Enter Certificate URI *"
                        value={`${baseUrl}/certificates/picture.png`}
                        onChange={(e) => contract.image = e.currentTarget.value}
                    />
                </div>
            </CardBody>
            <CardFooter>
                <div className="flex justify-center">
                    <Button
                        color="lightBlue"
                        size="regular"
                        ripple="dark"
                        onClick={createContract}
                    >
                        Create Certificate
                    </Button>
                </div>
            </CardFooter>
        </>
    );
}

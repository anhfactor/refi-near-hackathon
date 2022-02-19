import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';
import  { React, useEffect, useState } from 'react'
import axios from 'axios'
import { mint, getNextId } from '../helper/OwnerShipCreator'
import Textarea from 'components/Textarea/Textarea'
import Radio from 'components/Radio/Radio'
import Image from 'components/Image/Image'

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api'
const certificateUrl = process.env.NEXT_PUBLIC_BASE || 'http://localhost:5000'

export default function Mint(props) {
    const [radioInput, setRadioInput] = useState(true);
    const [radioUpload, setRadioUpload] = useState(false);
    const [tokenId, setTokenId] = useState(""); // get next token ID on chain
    const [tokens, setTokens] = useState([])
    const [certificateImage, setCertificateImage] = useState(`${certificateUrl}/certificates/01.png`)
    const [contractName, setContractName] = useState("")
    const [contractDescription, setContractDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadImage, setUploadImage] = useState(undefined);


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
    
    async function changeRadioCerticate(value = "input") {
        console.log(value)
        if(value == "input") {
            setRadioInput(true)
            setRadioUpload(false)
        } else {
            setRadioInput(false)
            setRadioUpload(true)
        }
    }

    async function uploadCertificate(file) {
        onFileUpload(file)
    }

    // On file upload 
    async function onFileUpload(selectedFile) { 
        // Create an object of formData 
        const formData = new FormData(); 
       
        // Update the formData object 
        formData.append( 
          "file", 
          selectedFile, 
          selectedFile.name
        ); 
       
        const result = await axios.post(`${certificateUrl}/certificates`, formData); 
        setUploadImage(result.data.filePath)
        setCertificateImage(result.data.filePath)
      }; 

    const [account, setAccount] = useState({
        account: '',
        address: '',
        balance: ''
      })
      const contractDefault = () => ({
        address: '',
        number: 0,
        image: `${certificateUrl}/certificates/01.png`
      })

      const [contract, setContract] = useState(contractDefault())

    const createContract = async (e) => {
        e.preventDefault()
        if (!props.address) return
        contract.address = await props.address.toLowerCase()
        contract.number = await tokenId
        contract.image = await certificateImage
        contract.name = await contractName
        contract.description = await contractDescription

    
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
                <div className="mb-2">
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
                        value={contractName}
                        onChange={(e) => setContractName(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <Textarea
                        color="lightBlue"
                        size="sm"
                        outline={true}
                        placeholder="Asset Description *"
                        value={contractDescription}
                        onChange={(e) => setContractDescription(e.target.value)}
                    />
                </div>
                <div class="flex flex-wrap gap-x-8 gap-y-4">
                    <Radio
                        color="lightBlue"
                        text="Input URI manual"
                        id="option-1"
                        name="option"
                        checked={radioInput}
                        onClick={(e) => changeRadioCerticate("input")}
                    />
                    <Radio
                        color="lightBlue"
                        text="Upload Certificate"
                        id="option-2"
                        name="option"
                        checked={radioUpload}
                        onClick={(e) => changeRadioCerticate("upload")}
                    />
                </div>
                <div className="mt-5">
                {radioInput ?
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="Enter Certificate URI *"
                        value={certificateImage}
                        onChange={(e) => setCertificateImage(e.target.value)}
                    />
                : <div class="flex justify-center">
                    <div class="w-full">
                        <label for="formFile" class="form-label inline-block mb-2 text-gray-700">Please upload certificate & Preview *</label>
                        <input class="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile"
                            value={selectedFile}
                            onChange={(e) => uploadCertificate(e.target.files[0])}
                            />
                        {uploadImage !== undefined ?
                            <div class="flex mt-2">
                                <a href={uploadImage} target="_blank" class="justify-center">
                                    <Image src={uploadImage} style={{width:"20%"}}/>
                                </a>
                            </div> : ""}
                    </div>
                </div>}
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

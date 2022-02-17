import React, { useEffect, useState } from 'react'
import Header from 'components/Documentation/Header';
import IndexNavbar from 'pagesComponents/IndexNavbar';
import IndexFooter from 'pagesComponents/IndexFooter';
import Page from 'components/Page/Page';
import Card from 'components/Card/Card';
import CardImage from 'components/Card/CardImage';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Heading5 from 'components/Typography/Heading5';
import Heading6 from 'components/Typography/Heading6';
import Image from 'components/Image/Image';
import Button from 'components/Button/Button';
import Link from "next/link";
import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api'

export default function Index(props) {
    const [tokens, setTokens] = useState([])
    const [nfts, setNfts] = useState([])

    useEffect(() => {
        if (tokens && tokens.length) return
        axios.get(`${baseUrl}/`).then(({ data }) => {
          setTokens(data)
          loadNFTs(data)
        })
      }, [])

    async function loadNFTs(data) {
        const items = await Promise.all(data.map(async i => {
          return {
            tokenId: i.number,
            name: i.name,
            image: i.image,
            owner: i.address
          }
        }))
        setNfts(items)
      }

    return (
        <>
            <Page>
            <Header title="Refi" />
            <IndexNavbar {...props}/>
                <section className="header relative pb-24 px-20">
                    <Card>
                        <CardBody>
                        <div class="flex flex-wrap justify-between">
                            <Heading5 style={{display:"inline-block"}}>Your NFT</Heading5>
                            <Link href="/" as={`/`}>
                                <Button
                                    color="red"
                                    buttonType="filled"
                                    size="sm"
                                    ripple="light"
                                    style={{display:"inline-block"}}
                                >
                                    <i class="fas fa-times"></i> Close
                                </Button>
                            </Link>
                        </div>
                        {props.address ? <>
                            <div class="container">
                                <div class="flex flex-wrap gap-12 mt-10">
                                    {nfts.map((nft, i) => (
                                        nft.owner.toUpperCase() == props.address.toUpperCase() ? <>
                                    <div class="w-64 text-center">
                                        <img alt={nft.name} src={nft.image}
                                        class="rounded-xl  max-w-full h-auto align-middle border-none undefined"
                                        />
                                        <Heading6 class="text-xl text-blue-gray-700 mt-4">{nft.name}</Heading6>
                                        <Button
                                            color="lightBlue"
                                            buttonType="filled"
                                            size="sm"
                                            ripple="light"
                                            onClick={() => {
                                                props.setTokenId(nft.tokenId)
                                                props.setModalTransfer()
                                            }}
                                        >
                                            <i class="fas fa-share-square"></i> Transfer
                                        </Button>
                                    </div>
                                    </> : ""
                                    ))
                                    }
                                </div>
                            </div></> : <></>}
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                </section>
            <IndexFooter />
            </Page>
        </>
    );
}

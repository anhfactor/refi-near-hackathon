import React, { useState } from 'react';
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

export default function Index(props) {
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
                            <div class="container">
                                <div class="flex flex-wrap gap-12 mt-10">
                                    <div class="w-64 text-center" style={{justifyContent:"center"}}>
                                        <img src="https://refi-backend.herokuapp.com/api/images/example.png" class="rounded-xl  max-w-full h-auto align-middle border-none undefined"/>
                                        <Heading6 class="text-xl text-blue-gray-700 mt-4">A</Heading6>
                                        <Button
                                            color="lightBlue"
                                            buttonType="filled"
                                            size="sm"
                                            ripple="light"
                                        >
                                            <i class="fas fa-share-square"></i> Transfer
                                        </Button>
                                    </div>
                                    <div class="w-64 text-center">
                                        <img src="https://refi-backend.herokuapp.com/api/images/example.png" class="rounded-xl  max-w-full h-auto align-middle border-none undefined"/>
                                        <Heading6 class="text-xl text-blue-gray-700 mt-4">B</Heading6>
                                        <Button
                                            color="lightBlue"
                                            buttonType="filled"
                                            size="sm"
                                            ripple="light"
                                        >
                                            <i class="fas fa-share-square"></i> Transfer
                                        </Button>
                                    </div>
                                    <div class="w-64 text-center">
                                        <img src="https://refi-backend.herokuapp.com/api/images/example.png" class="rounded-xl  max-w-full h-auto align-middle border-none undefined"/>
                                        <Heading6 class="text-xl text-blue-gray-700 mt-4">A</Heading6>
                                        <Button
                                            color="lightBlue"
                                            buttonType="filled"
                                            size="sm"
                                            ripple="light"
                                        >
                                            <i class="fas fa-share-square"></i> Transfer
                                        </Button>
                                    </div>
                                    <div class="w-64 text-center">
                                        <img src="https://refi-backend.herokuapp.com/api/images/example.png" class="rounded-xl  max-w-full h-auto align-middle border-none undefined"/>
                                        <Heading6 class="text-xl text-blue-gray-700 mt-4">B</Heading6>
                                        <Button
                                            color="lightBlue"
                                            buttonType="filled"
                                            size="sm"
                                            ripple="light"
                                        >
                                            <i class="fas fa-share-square"></i> Transfer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                </section>
            <IndexFooter />
            </Page>
        </>
    );
}

import React, { useState } from 'react';
import Header from 'components/Documentation/Header';
import IndexNavbar from 'pagesComponents/IndexNavbar';
import IndexFooter from 'pagesComponents/IndexFooter';
import Container from 'components/Container/Container';
import Page from 'components/Page/Page';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Button from 'components/Button/Button';
import InputIcon from 'components/Input/InputIcon';
import TabItem from 'components/Tab/TabItem';
import TabList from 'components/Tab/TabList';
import TabContent from 'components/Tab/TabContent';
import TabPane from 'components/Tab/TabPane';

export default function Index(props) {
    const [openTab, setOpenTab] = useState(1);
    return (
        <>
            <Page>
            <Header title="Refi" />
            <IndexNavbar {...props}/>
            <section className="header relative pb-24">
                <Container>
                    <Card>
                      <TabList color="">
                          <TabItem
                              onClick={(e) => {
                                  e.preventDefault();
                                  setOpenTab(1);
                                }}
                                ripple="light"
                                active={openTab === 1 ? true : false}
                                className={openTab === 1 ? "text-dark" : "text-gray-400"}
                                href="mint"
                              >
                              Mint
                              </TabItem>
                              <TabItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpenTab(2);
                                }}
                                ripple="light"
                                className={openTab === 2 ? "text-dark" : "text-gray-400"}
                                active={openTab === 2 ? true : false}
                                href="fraction"
                              >
                              Fractional
                              </TabItem>
                              <TabItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpenTab(3);
                                }}
                                ripple="light"
                                className={openTab === 3 ? "text-dark" : "text-gray-400"}
                                active={openTab === 2 ? true : false}
                                href="swap"
                              >
                              Swap
                              </TabItem>
                              <TabItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpenTab(4);
                                }}
                                ripple="light"
                                className={openTab === 4 ? "text-dark" : "text-gray-400"}
                                active={openTab === 2 ? true : false}
                                href="lending"
                              >
                              Lending
                          </TabItem>
                      </TabList>
                        <TabContent>
                          <TabPane active={openTab === 1 ? true : false}>
                            <CardBody>
                                  <div className="mb-10">
                                      <InputIcon
                                          type="text"
                                          color="lightBlue"
                                          placeholder="Contract number *"
                                          iconName="account_circle"
                                      />
                                  </div>
                                  <div className="mb-10">
                                      <InputIcon
                                          type="text"
                                          color="lightBlue"
                                          placeholder="Asset name *"
                                      />
                                  </div>
                                  <div className="">
                                      <InputIcon
                                          type="text"
                                          color="lightBlue"
                                          placeholder="Digital image asset *"
                                      />
                                  </div>
                            </CardBody>
                            <CardFooter>
                                <div className="flex justify-center">
                                    <Button
                                        color="lightBlue"
                                        size="lg"
                                        ripple="dark"
                                    >
                                        Create digital assets
                                    </Button>
                                </div>
                            </CardFooter>
                          </TabPane>
                          <TabPane active={openTab === 2 ? true : false}>
                            <CardBody>
                                  <div className="mb-10">
                                      <InputIcon
                                          type="text"
                                          color="lightBlue"
                                          placeholder="Contract number *"
                                          iconName="account_circle"
                                      />
                                  </div>
                                  <div className="">
                                      <InputIcon
                                          type="text"
                                          color="lightBlue"
                                          placeholder="Amount fraction *"
                                      />
                                  </div>
                            </CardBody>
                            <CardFooter>
                                <div className="flex justify-center">
                                    <Button
                                        color="lightBlue"
                                        size="lg"
                                        ripple="dark"
                                    >
                                        Fractionalise
                                    </Button>
                                </div>
                            </CardFooter>
                          </TabPane>
                          <TabPane active={openTab === 3 ? true : false}>
                            <CardBody>
                                  <div className="mb-5">
                                      <InputIcon
                                          type="text"
                                          color="lightBlue"
                                          placeholder="PVF"
                                      />
                                  </div>
                                  <div className="flex justify-center">
                                    <i class="fas fa-sync"></i>
                                  </div>
                                  <div>
                                      <InputIcon
                                          type="text"
                                          color="lightBlue"
                                          placeholder="eEUR"
                                      />
                                  </div>
                            </CardBody>
                            <CardFooter>
                                <div className="flex justify-center">
                                    <Button
                                        color="lightBlue"
                                        size="lg"
                                        ripple="dark"
                                    >
                                        Swap
                                    </Button>
                                </div>
                            </CardFooter>
                          </TabPane>
                          <TabPane active={openTab === 4 ? true : false}>
                            <CardBody>
                                  <div className="">
                                      <InputIcon
                                          type="text"
                                          color="lightBlue"
                                          placeholder="$Amount"
                                      />
                                  </div>
                            </CardBody>
                            <CardFooter>
                                <div className="flex justify-center">
                                    <Button
                                        color="lightBlue"
                                        size="lg"
                                        ripple="dark"
                                    >
                                        Deposit
                                    </Button>
                                </div>
                            </CardFooter>
                          </TabPane>
                      </TabContent>
                    </Card>
                </Container>
            </section>

            <IndexFooter />
            </Page>
        </>
    );
}

import React, { useState } from 'react';
import Header from 'components/Documentation/Header';
import IndexNavbar from 'pagesComponents/IndexNavbar';
import IndexFooter from 'pagesComponents/IndexFooter';
import Container from 'components/Container/Container';
import Page from 'components/Page/Page';
import Card from 'components/Card/Card';
import TabItem from 'components/Tab/TabItem';
import TabList from 'components/Tab/TabList';
import TabContent from 'components/Tab/TabContent';
import TabPane from 'components/Tab/TabPane';
import Mint from 'pagesComponents/Mint';
import Fractional from 'pagesComponents/Fractional';
import Swap from 'pagesComponents/Swap';
import Deposit from 'pagesComponents/Deposit';
import Faucet from 'pagesComponents/Faucet';

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
                                active={openTab === 3 ? true : false}
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
                                active={openTab === 4 ? true : false}
                                href="lending"
                              >
                              Lending
                          </TabItem>
                          <TabItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  setOpenTab(5);
                                }}
                                ripple="light"
                                className={openTab === 5 ? "text-dark" : "text-gray-400"}
                                active={openTab === 5 ? true : false}
                                href="lending"
                              >
                              Faucet
                          </TabItem>
                      </TabList>
                        <TabContent>
                          <TabPane active={openTab === 1 ? true : false}>
                            <Mint {...props}/>
                          </TabPane>
                          <TabPane active={openTab === 2 ? true : false}>
                            <Fractional {...props}/>
                          </TabPane>
                          <TabPane active={openTab === 3 ? true : false}>
                            <Swap {...props}/>
                          </TabPane>
                          <TabPane active={openTab === 4 ? true : false}>
                            <Deposit {...props}/>
                          </TabPane>
                          <TabPane active={openTab === 5 ? true : false}>
                            <Faucet {...props}/>
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

import React from 'react';
import Head from 'next/head';
import App from "next/app";

import 'material-icons/css/material-icons.min.css';
import 'assets/styles/index.css';
import detectEthereumProvider from '@metamask/detect-provider';
import Modal from "components/Modal/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalBody from "components/Modal/ModalBody";
import ModalFooter from "components/Modal/ModalFooter";
import Button from 'components/Button/Button';
import BackgroundImage from 'assets/img/backgroundImage.jpeg';

const networks = {
  aurora_testnet: {
    chainId: `0x${Number(process.env.NEXT_PUBLIC_CHAIN_ID).toString(16)}`,
    chainName: `${process.env.NEXT_PUBLIC_CHAIN_NAME}`,
    nativeCurrency: {
      name: `${process.env.NEXT_PUBLIC_CHAIN_SNAME}`,
      symbol: `${process.env.NEXT_PUBLIC_CHAIN_SYMBOL}`,
      decimals: 18
    },
    rpcUrls: [`${process.env.NEXT_PUBLIC_CHAIN_rpcUrls}`],
    blockExplorerUrls: [`${process.env.NEXT_PUBLIC_CHAIN_blockExplorerUrls}`]
  }
}

export default class MyApp extends App {
    constructor(props) {
      super(props);
      this.state = { address: undefined, 
                    modalMessage: "You have connected.", 
                    showModal: false,
                    showModalTransfer: true,
                    isWrongNetwork: true
                  };
      this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
      this.handleChangeChainId = this.handleChangeChainId.bind(this)
    }
    async componentDidMount() {
      const provider = await detectEthereumProvider();
      if (provider) {
        this._connectWallet();
        ethereum.on('accountsChanged', this.handleAccountsChanged);
        ethereum.on('chainChanged', (_chainId) => this.handleChangeChainId(_chainId));
      } else {
        this.setState({
          modalMessage: 'Please install MetaMask!',
          showModal: true
        })
      }
    }

    setModal(value) {
      this.setState({
        showModal: value
      })
    }

    setModalTransfer(value) {
      this.setState({
        showModalTransfer: value
      })
    }
  
    static async getInitialProps({ Component, router, ctx }) {
      let pageProps = {};
  
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
  
      return { pageProps };
    }
  
    // For now, 'eth_accounts' will continue to always return an array
    handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        this.setState({
          modalMessage: 'Please connect to MetaMask.',
          showModal: true
        })
      } else if (accounts[0] !== this.state.address) {
        this.setState({
          address: accounts[0]
        })
      }
    }

    async handleNetworkSwitch(networkName = "aurora_testnet") {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName]
          }
        ]
      });
    }

    // detect when change chainId from metamask
    async handleChangeChainId(chainId) {
      let chainIdInt = await parseInt(chainId, 16);
      if (String(chainIdInt) == String(process.env.NEXT_PUBLIC_CHAIN_ID)) {
        this.setState({
          modalMessage: `You have connected.`,
          showModal: true,
          isWrongNetwork: true
        })
      } else {
        this.setState({
          isWrongNetwork: false
        })
      }
    }
  
    async _connectWallet() {
      try {
        await ethereum
          .request({ method: 'eth_requestAccounts' })
          .then(this.handleAccountsChanged)
          .catch((err) => {
            if (err.code === 4001) {
              this.setState({
                modalMessage: 'Please connect to MetaMask.',
                showModal: true
              })
            } else {
              console.error(err);
            }
          });
        if (ethereum.networkVersion !== process.env.NEXT_PUBLIC_CHAIN_ID) {
          this.setState({
            modalMessage: `Please connect to ${process.env.NEXT_PUBLIC_CHAIN_NAME}. ChainId: ${process.env.NEXT_PUBLIC_CHAIN_ID} `,
            showModal: true,
            isWrongNetwork: false
          })
          this.handleNetworkSwitch();
          return
        }
      } catch (error) {
        this.setState({
          modalMessage: 'Please install MetaMask!',
          showModal: true
        })
      }
    }
  
    _disconnectWallet() {
      this.setState({
        address: undefined
      })  
    }
  
    render() {
      const { Component, pageProps } = this.props;
  
      const Layout = Component.layout || (({ children }) => <>{children}</>);
  
      return (
        <React.Fragment>
          <Head>
          <meta charSet="utf-8" />
                 <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="theme-color" content="#03a9f4" />
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
                    integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
                    crossOrigin="anonymous"
                />
            <title>{process.env.NEXT_PUBLIC_CONTRACT_NAME}</title>
          </Head>
          {/* Modal message */}
          <Modal size="lg" active={this.state.showModal} toggler={() => this.setModal(false)}>
                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 font-normal">
                        {this.state.modalMessage}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => this.setModal(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
          {/* Modal message transfer */}
          <Modal size="lg" active={this.state.showModalTransfer} toggler={() => this.setModalTransfer(false)}>
                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 font-normal">
                        {this.state.modalMessage}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => this.setModalTransfer(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
          <Layout>
          <div style={{backgroundImage: `url(${BackgroundImage})`, 
                      backgroundRepeat: "no-repeat",  
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundFilter: `blur(100px)`
                      }}
                      >
            <Component {...pageProps}
              connectWallet={() => this._connectWallet()}
              disconnectWallet={() => this._disconnectWallet()}
              handleNetworkSwitch={() => this.handleNetworkSwitch()}
              address={this.state.address}
              isOpenPopver={this.state.isOpenPopver}
              popoverColor={this.state.popoverColor}
              popoverMessage={this.state.popoverMessage}
              isWrongNetwork={this.state.isWrongNetwork}
            />
          </div>
          </Layout>
        </React.Fragment>
      );
    }
  }
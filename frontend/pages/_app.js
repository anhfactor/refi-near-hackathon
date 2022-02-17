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
import InputIcon from 'components/Input/InputIcon';
import { transferContract } from "helper/OwnerShipCreator"
import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api'

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
                    showModalTransfer: false,
                    isWrongNetwork: true,
                    assetsTokenId: '',
                    receiverAddress: ''
                  };
      this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
      this.handleChangeChainId = this.handleChangeChainId.bind(this)
      this.handleTokenId= this.handleTokenId.bind(this)
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

    setModalTransfer() {
      this.setState(prevState =>({
        showModalTransfer: !prevState.showModalTransfer
      }))
    }
  
    static async getInitialProps({ Component, router, ctx }) {
      let pageProps = {};
  
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
  
      return { pageProps };
    }

    handleTokenId = (value) => {
      console.log(value)
      this.setState({assetsTokenId: value});
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

    setReceiverAddress(value) {
      this.setState({ receiverAddress: value })
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
          console.log()
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

    async _transferContract() {
      let body = { "ownerAddress": this.state.address.toLowerCase() , "receiverAddress": this.state.receiverAddress.toLowerCase() }
  
      // change in smartcontract
      await transferContract(this.state.assetsTokenId, this.state.address, this.state.receiverAddress)
      // // change in server
      const metadata = await axios.put(`${baseUrl}/${this.state.assetsTokenId}`, body)
      console.log(`Response body: `, metadata)
  
      window.location.href = '/assets'
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
          <Modal size="lg" active={this.state.showModalTransfer} toggler={() => this.setModalTransfer()}>
              <ModalHeader toggler={() => setModalTransfer()}>
                    Transfer NFT: from Owner to Receiver 
                </ModalHeader>
                <ModalBody>
                  <div className="mb-10">
                      <InputIcon
                          type="text"
                          color="lightBlue"
                          placeholder="Certificate ID *"
                          iconName="fa-id-badge"
                          iconFamily="font-awesome"
                          disabled
                          value={this.state.assetsTokenId}
                      />
                  </div>
                  <div className="mb-10">
                      <InputIcon
                          type="text"
                          color="lightBlue"
                          placeholder="Owner address *"
                          disabled
                          value={this.state.address}
                      />
                  </div>
                  <div className="">
                      <InputIcon
                          type="text"
                          color="lightBlue"
                          placeholder="Receiver address *"
                          value={this.state.receiverAddress}
                          onChange={(e) => { this.setReceiverAddress(e.currentTarget.value) }}
                      />
                  </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={() => this.setModalTransfer()}
                        ripple="dark"
                    >
                        Close
                    </Button>

                    <Button
                        color="green"
                        onClick={() => this._transferContract()}
                        ripple="light"
                    >
                        Confirm
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
              setModalTransfer={() => this.setModalTransfer()}
              setTokenId={this.handleTokenId}
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
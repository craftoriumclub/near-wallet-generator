import React, {useState, useRef} from 'react';
import {btnClass} from '../App';
import Footer from './Footer';
import {keyStores, utils} from "near-api-js";
import {config} from "../state/config";
import * as nearAPI from "near-api-js";

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

export const {
    FUNDING_DATA,
    ACCOUNT_LINKS,
    GAS,
    SEED_PHRASE_LOCAL_COPY,
    networkId,
    nodeUrl,
    walletUrlRecoverSeedPhrase,
    walletUrl,
    walletUrlRecoverPrivateKey,
    nameSuffix,
    masterAccount,
    contractName,
    privateKeyMaster,
    craftoriumEcosystemWebSite
} = config;


const {generateSeedPhrase} = require('near-seed-phrase');


export const Giver = ({state, update, dispatch}) => {

    const buttonRef = useRef(null);

    const {app, wallet, links, claimed} = state;

    const [generatedSeedPhrase, setGeneratedSeedPhrase] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const [id, setId] = useState('');


    const [btcWalletInfo, setBtcWalletInfo] = useState({
        address: '',
        path: '',
        KeyToWIF: '',
    });

    const generateBTCWallet = (mnemonic) => {
        const network = bitcoin.networks.bitcoin //use networks.testnet for testnet

        const path = `m/49'/0'/0'/0` // Use m/49'/1'/0'/0 for testnet

        const seed = bip39.mnemonicToSeedSync(mnemonic)
        let root = bip32.fromSeed(seed, network)

        let account = root.derivePath(path)
        let node = account.derive(0).derive(0)

        let btcAddress = bitcoin.payments.p2pkh({
            pubkey: node.publicKey,
            network: network,
        }).address

        const walletInfo = {
            address: btcAddress,
            path,
            KeyToWIF: node.toWIF().toString(),
        };

        setBtcWalletInfo(walletInfo);
    }


    const generateSeedPhraseAndFundAccount = async (accountId) => {
        buttonRef.current.disabled = true;

        const keyPairMaster = utils.KeyPair.fromString(privateKeyMaster);

        const keyStore = new keyStores.InMemoryKeyStore();
        keyStore.setKey('mainnet', masterAccount, keyPairMaster);

        const near = await nearAPI.connect({
            networkId,
            nodeUrl,
            walletUrl,
            deps: {keyStore: keyStore},
        });

        const {publicKey, secretKey, seedPhrase} = generateSeedPhrase();

        setGeneratedSeedPhrase(seedPhrase);
        setPublicKey(publicKey);
        setSecretKey(secretKey);

        generateBTCWallet(seedPhrase);

        const account = await near.account(masterAccount);

        await account.createAccount(
            accountId + nameSuffix,
            publicKey.toString(),
            "100000000000000000000000"
        );
    };

    return (
        <>

            <>
                <h2 className="mt-5">Generate New Wallet</h2>

                <p>Функціонал для створення гаманця</p>

                <form className={'needs-validation ' + (app.wasValidated ? 'was-validated' : '')} autoComplete="off">
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="accountName"
                            placeholder=" "
                            required
                            minLength={app.accountTaken ? 999999 : 2}
                            maxLength={48}
                            pattern="^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$"
                            autoComplete="off"
                            value={id}
                            onChange={(e) => {
                                const v = e.target.value.toLowerCase();
                                if (v === '' || /[^a-z0-9_-]/i.test(v)) {
                                    setId('');
                                    wallet.isAccountTaken(false);
                                } else {
                                    setId(v);
                                    wallet.isAccountTaken(v);
                                }
                                checkDisabled();
                            }}
                        />
                        <label htmlFor="accountName">Enter an account name</label>
                        <div className="invalid-feedback">
                            {app.accountTaken
                                ? 'Account name is already taken'
                                : id === ''
                                    ? 'Account name cannot be empty'
                                    : /[^a-z0-9_-]/i.test(id)
                                        ? 'Account name can only contain letters, numbers, underscores, and hyphens'
                                        : '2-48 characters, no spaces, no symbols'}
                        </div>
                    </div>
                    <small className="text-muted d-block mb-3">The "{nameSuffix}" suffix will be added automatically to
                        this account name.</small>
                </form>

                <button ref={buttonRef} className={btnClass} onClick={() => generateSeedPhraseAndFundAccount(id)}
                        disabled={id === '' || /[^a-z0-9_-]/i.test(id) || app.accountTaken}>
                    CREATE ACCOUNT
                </button>

                {generatedSeedPhrase &&
                    (
                        <div className="mt-3">
                            <header>Near Wallet</header>

                            <ul>
                                <li> public key: {publicKey}</li>
                                <li> private key: {secretKey}</li>
                                <li> seed phrase: {generatedSeedPhrase}</li>
                            </ul>

                        </div>)
                }

                {generatedSeedPhrase && (
                    <div className="mt-3">
                        <p> Sign In using {' '}
                            <a href={walletUrlRecoverSeedPhrase} target="_blank">
                                Near Wallet Recover Seed Phrase
                            </a> {' '} or Sign In using {' '}
                            <a href={walletUrlRecoverPrivateKey} target="_blank">
                                Near Wallet Recover by Private Key
                            </a>

                        </p>
                    </div>
                )
                }


                {generatedSeedPhrase && (
                    <div className="mt-3">
                        <header>Bitcoin Wallet</header>

                        <ul>
                            <li> address: {btcWalletInfo.address}</li>
                            <li> path: {btcWalletInfo.path}</li>
                            <li> privateKey (Wallet Import Format): {btcWalletInfo.KeyToWIF}</li>
                            <li> seed phrase: {generatedSeedPhrase}</li>
                        </ul>

                        Sign In using any Hardware/Software Bitcoin wallet of your choice
                    </div>
                )}

                {generatedSeedPhrase && (
                    <div className="mt-3">
                        <p> GO TO {' '}
                            <a href={craftoriumEcosystemWebSite} target="_blank">
                                Craftorium Ecosystem
                            </a>
                        </p>
                    </div>
                )}
            </>


            <Footer/>
        </>
    );
};

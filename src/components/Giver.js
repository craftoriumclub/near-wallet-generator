import React, {useState, useRef} from 'react';
import {btnClass} from '../App';
import {getVideoId} from '../utils/youtube';
import Footer from './Footer';
import {keyStores, utils} from "near-api-js";
import {config} from "../state/config";
import * as nearAPI from "near-api-js";


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
    contractName,
    privateKeyMaster
} = config;


const {generateSeedPhrase} = require('near-seed-phrase');


const forExample = `(for example: "bestie${nameSuffix}" or "squad${nameSuffix}")`;
const forExampleWithoutSuffix = forExample.replaceAll(nameSuffix, '');
const baseUrl = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
const getLink = (accountId, key, wallet, message = '', link = '') =>
    `${baseUrl}?accountId=${accountId}&key=${key}&from=${wallet.getAccountId()}&message=${encodeURIComponent(message)}&link=${getVideoId(link)}`;

console.log(nameSuffix);

export const Giver = ({state, update, dispatch}) => {

    const buttonRef = useRef(null);

    const {app, wallet, links, claimed} = state;

    const [generatedSeedPhrase, setGeneratedSeedPhrase] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const [id, setId] = useState('');


    const generateSeedPhraseAndFundAccount = async (accountId) => {
        buttonRef.current.disabled = true;

        console.log('button clicked');


        const keyPairMaster = utils.KeyPair.fromString(privateKeyMaster);

        const keyStore = new keyStores.InMemoryKeyStore();
        keyStore.setKey('testnet', 'craftorium.testnet', keyPairMaster);

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

        const account = await near.account("craftorium.testnet");

        await account.createAccount(
            accountId + nameSuffix, // new account name
            publicKey.toString(), // public key for new account
            "1000000000000000000000000" // initial balance for new account in yoctoNEAR
        );

    };

    const checkDisabled = () => {
        setTimeout(() => setDisabled(!!document.querySelectorAll(':invalid').length), 250);
    };

    return (
        <>

            <>
                <h2 className="mt-5">Create {links && links.length > 0 ? 'Another' : ''} Gift Account</h2>
                <form className={'needs-validation ' + (app.wasValidated ? 'was-validated' : '')} autocomplete="off">
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="accountName"
                            placeholder=" "
                            required
                            minlength={app.accountTaken ? 999999 : 2}
                            maxlength={48}
                            pattern="^(([a-z\d]+[\-_])*[a-z\d]+$"
                            autocomplete="off"
                            value={id}
                            onChange={(e) => {
                                const v = e.target.value.toLowerCase();
                                setId(v);
                                wallet.isAccountTaken(v);
                                checkDisabled();
                            }}
                        />
                        <label for="accountName">Enter an account name</label>
                        <div
                            className="invalid-feedback">{app.accountTaken ? 'Account name is already taken' : '2-48 characters, no spaces, no symbols'}</div>
                    </div>
                    <small className="text-muted d-block mb-3">The "{nameSuffix}" suffix will be added automatically to
                        this account name.</small>

                </form>
                <button ref={buttonRef} className={btnClass} onClick={() => {
                    generateSeedPhraseAndFundAccount(id)
                }}>
                    CREATE ACCOUNT
                </button>

                {generatedSeedPhrase &&
                    (
                        <div className="mt-3">
                            <p>Public key:</p>
                            <p>{publicKey}</p>
                            <p>Secret key:</p>
                            <p>{secretKey}</p>

                            <p>Generated Seed Phrase:</p>
                            <p>{generatedSeedPhrase}</p>

                        </div>)
                }

                {generatedSeedPhrase && (
                    <div className="mt-3">
                        <p> Sign In using {' '}
                            <a href={walletUrlRecoverSeedPhrase} target="_blank">
                                Near Wallet Recover Seed Phrase
                            </a>
                        </p>
                    </div>
                )
                }


                {generatedSeedPhrase && (
                    <div className="mt-3">
                        <p> Or Sign In using {' '}
                            <a href={walletUrlRecoverPrivateKey} target="_blank">
                                Near Wallet Recover by Private Key
                            </a>
                        </p>
                    </div>
                )}

            </>


            <Footer/>
        </>
    );
};

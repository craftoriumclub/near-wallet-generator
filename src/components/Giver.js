import React, {useState} from 'react';
import {flexClass, btnClass} from '../App';
import Footer from './Footer';

const {generateSeedPhrase} = require('near-seed-phrase');

const baseUrl = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
const getLink = (accountId, key, wallet, message = '', link = '') =>
    `${baseUrl}?accountId=${accountId}&key=${key}&from=${wallet.getAccountId()}&message=${encodeURIComponent(message)}&link=${getVideoId(link)}`;

export const Giver = () => {

    const [generatedSeedPhrase, setGeneratedSeedPhrase] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const generateWalletWithSeedPhrase = () => {
        const {seedPhrase, publicKey, secretKey} = generateSeedPhrase();

        setGeneratedSeedPhrase(seedPhrase);
        setPublicKey(publicKey);
        setSecretKey(secretKey);
    };

    return (
        <>
            <div className={flexClass + 'mb-3 text-center'}>
                <h1>Craftorium Near Wallet Generator!</h1>
            </div>

            <h4>
                Create new wallet on the{' '}
                <a href="https://near.org/" target="_blank">
                    NEAR blockchain
                </a>
                .
            </h4>
            {(

                <p className="mb-3">
                    There is a functionality to create Near Wallet, which you can import in through 12 words: seed
                    phrase
                </p>

            )}

            {(
                <>
                    <h2 className="mt-5">Create your new Near Wallet</h2>
                    <button
                        className={btnClass + 'pulse'}
                        onClick={generateWalletWithSeedPhrase}
                    >
                        Generate My Account With Seed Phrase
                    </button>

                    {generatedSeedPhrase &&
                        (
                            <div className="mt-3">
                                <p>Generated Seed Phrase:</p>
                                <p>{generatedSeedPhrase}</p>
                                <p>Public key:</p>
                                <p>{publicKey}</p>
                                <p>Secret key:</p>
                                <p>{secretKey}</p>
                            </div>)
                    }

                    {generatedSeedPhrase && (
                        <div className="mt-3">
                            <p> sing in using {' '}
                                <a href="https://app.mynearwallet.com/recover-seed-phrase" target="_blank">
                                    Near Wallet
                                </a>
                            </p>
                        </div>
                    )
                    }

                </>
            )}

            <Footer/>
        </>
    );
};

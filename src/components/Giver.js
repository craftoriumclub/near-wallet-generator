import React, {useState} from 'react';
import {flexClass, btnClass, qs} from '../App';
import Footer from './Footer';

const {parseSeedPhrase, generateSeedPhrase} = require('near-seed-phrase');


const baseUrl = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
const getLink = (accountId, key, wallet, message = '', link = '') =>
    `${baseUrl}?accountId=${accountId}&key=${key}&from=${wallet.getAccountId()}&message=${encodeURIComponent(message)}&link=${getVideoId(link)}`;

export const Giver = () => {

    const [generatedSeedPhrase, setGeneratedSeedPhrase] = useState('');
    const generateWalletWithSeedPhrase = () => {
        const {seedPhrase} = generateSeedPhrase();
        setGeneratedSeedPhrase(seedPhrase);
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

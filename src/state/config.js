// testnet / default
let config = {
  SEED_PHRASE_LOCAL_COPY: '__SEED_PHRASE_LOCAL_COPY',
  FUNDING_DATA: '__FUNDING_DATA',
  ACCOUNT_LINKS: '__ACCOUNT_LINKS',
  GAS: '200000000000000',
  networkId: 'testnet',
  privateKeyMaster: 'ed25519:4d8mGUpPYPpY7hCPyAnkpBwosaVCX1qcuTkP2A2cV5pQZqbhV4T9geVN3gsUXTnaVY4jLSjEDQ1jD2V8SSYce2SS',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrlRecoverSeedPhrase: 'https://testnet.mynearwallet.com/recover-seed-phrase',
  walletUrlRecoverPrivateKey: 'https://testnet.mynearwallet.com/recover-private-key',
  walletUrl: 'https://testnet.mynearwallet.com/recover-seed-phrase',
  nameSuffix: '.craftorium.testnet',
  contractName: 'testnet',
  craftoriumEcosystemWebSite: 'https://6575e690648ed7421817720a--clever-toffee-b6a7c6.netlify.app/',
};

if (process.env.REACT_APP_ENV === 'prod') {
  config = {
    ...config,
    networkId: 'mainnet',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrlRecoverSeedPhrase: 'https://app.mynearwallet.com/recover-seed-phrase',
    walletUrlRecoverPrivateKey: 'https://app.mynearwallet.com/recover-private-key',
    walletUrl: 'https://app.mynearwallet.com/',
    nameSuffix: '.near',
    contractName: 'near',
    exchangeWebSite: 'https://6575e690648ed7421817720a--clever-toffee-b6a7c6.netlify.app/',
  };
}

export { config };
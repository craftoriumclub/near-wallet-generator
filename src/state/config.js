// testnet / default
let config = {
  SEED_PHRASE_LOCAL_COPY: '__SEED_PHRASE_LOCAL_COPY',
  FUNDING_DATA: '__FUNDING_DATA',
  ACCOUNT_LINKS: '__ACCOUNT_LINKS',
  GAS: '200000000000000',
  networkId: 'mainnet',
  privateKeyMaster: 'HAVE_TO_PASTE_PRIVATE_KEY',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrlRecoverSeedPhrase: 'https://app.mynearwallet.com/recover-seed-phrase',
  walletUrlRecoverPrivateKey: 'https://app.mynearwallet.com/recover-private-key',
  nameSuffix: '.master-craftorium.near',
  craftoriumEcosystemWebSite: 'https://ibbclub.org/eco-frontend/',
};

if (process.env.REACT_APP_ENV === 'prod') {
  config = {
    ...config,
    networkId: 'mainnet',
    privateKeyMaster: 'HAVE_TO_PASTE_PRIVATE_KEY',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrlRecoverSeedPhrase: 'https://app.mynearwallet.com/recover-seed-phrase',
    walletUrlRecoverPrivateKey: 'https://app.mynearwallet.com/recover-private-key',
    nameSuffix: '.master-craftorium.near',
    craftoriumEcosystemWebSite: 'https://ibbclub.org/eco-frontend/',
  };
}

export { config };
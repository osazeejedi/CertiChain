const LitJsSdk = require('@lit-protocol/lit-node-client');

const litClient = new LitJsSdk.LitNodeClient();
litClient.connect();

module.exports = litClient;
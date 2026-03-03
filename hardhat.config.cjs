require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.20",
    networks: {
        autheoTestnet: {
              url: "https://testnet-rpc2.autheo.com",
                    chainId: 785,
                          accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
                              },
                                },

                                  etherscan: {
                                      apiKey: {
                                            autheoTestnet: "abc" // isi dummy dulu kalau explorer tidak butuh API key
                                                },
                                                    customChains: [
                                                          {
                                                                  network: "autheoTestnet",
                                                                          chainId: 785,
                                                                                  urls: {
                                                                                            apiURL: "https://testnet-explorer.autheo.com/api",
                                                                                                      browserURL: "https://testnet-explorer.autheo.com"
                                                                                                              }
                                                                                                                    }
                                                                                                                        ]
                                                                                                                          }
                                                                                                                          };
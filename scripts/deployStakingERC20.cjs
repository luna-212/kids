const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying with:", deployer.address);

      const TOKEN_ADDRESS = "0x19aDf1d00027F97BC9AAdA0D659986ad29761e8d"; 
        const REWARD_ADDRESS = "0x9909Ef319caBB2C11f23dF1141CB20Ed817988cb";

          const Staking = await hre.ethers.getContractFactory("DevStake");

            const staking = await Staking.deploy(
                TOKEN_ADDRESS,
                    REWARD_ADDRESS
                      );

                        await staking.deployed();

                          console.log("Staking deployed at:", staking.address);
                          }

                          main().catch((error) => {
                            console.error(error);
                              process.exitCode = 1;
                              });
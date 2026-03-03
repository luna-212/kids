const { ethers } = require("hardhat");

async function main() {

  const STAKING_ADDRESS = "0x008313Dfba269808C63745708D97B5b0b38Aed76";

    const [signer] = await ethers.getSigners();
      console.log("Account:", signer.address);

        const staking = await ethers.getContractAt(
            "CoonStaking",
                STAKING_ADDRESS
                  );

                    const tx = await staking.claimReward(); // langsung claim

                      console.log("Claim tx:", tx.hash);

                        await tx.wait();

                          console.log("✅ Reward claimed successfully!");
                          }

                          main().catch((error) => {
                            console.error(error);
                              process.exitCode = 1;
                              });
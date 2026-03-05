const { ethers } = require("hardhat");

async function main() {

  // GANTI dengan alamat staking contract kamu
    const STAKING_ADDRESS = "0x008313Dfba269808C63745708D97B5b0b38Aed76";

      // jumlah yang mau di stake (contoh: 10 Coon)
        const AMOUNT = "0.2";

          const [signer] = await ethers.getSigners();

            console.log("Staking with account:", signer.address);

              const staking = await ethers.getContractAt(
                  "CoonStaking",
                      STAKING_ADDRESS
                        );

                          console.log(`Staking ${AMOUNT} Coon...`);

                            const tx = await staking.stake({
                                value: ethers.utils.parseEther(AMOUNT)
                                  });

                                    console.log("Transaction hash:", tx.hash);

                                      await tx.wait();

                                        console.log("✅ Stake successful!");
                                        }

                                        main().catch((error) => {
                                          console.error(error);
                                            process.exitCode = 1;
                                            });
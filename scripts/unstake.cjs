const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();
    console.log("Unstaking from:", user.address);

      // daftar contract staking
        const STAKING_CONTRACTS = [
            "0xbA3Df320996eed030a418413e239be44f28C0e3F", "0xe35DC8f82676D8Cf911Ea5c1962B990fA671E732"
                  ];

                    const AMOUNT = "1000"; // jumlah token

                      for (let i = 0; i < STAKING_CONTRACTS.length; i++) {

                          const STAKING_ADDRESS = STAKING_CONTRACTS[i];

                              console.log("\nProcessing staking:", STAKING_ADDRESS);

                                  const staking = await hre.ethers.getContractAt(
                                        "DevStake",
                                              STAKING_ADDRESS
                                                  );

                                                      const amountInWei = hre.ethers.utils.parseUnits(AMOUNT, 18);

                                                          const tx = await staking.unstake(amountInWei);

                                                              console.log("Unstake tx hash:", tx.hash);

                                                                  await tx.wait();

                                                                      console.log("✅ Unstake berhasil dari", STAKING_ADDRESS);
                                                                        }
                                                                        }

                                                                        main().catch((error) => {
                                                                          console.error(error);
                                                                            process.exitCode = 1;
                                                                            });
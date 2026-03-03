const hre = require("hardhat");

async function main() {

  const [user] = await hre.ethers.getSigners();
    console.log("Using account:", user.address);

      // 🔥 GANTI dengan 2 alamat staking kamu
        const STAKING_CONTRACTS = [
            "0x22a621F698A591b242a7d26D1254d0f870d8904b",
                "0xe35DC8f82676D8Cf911Ea5c1962B990fA671E732"
                  ];

                    for (let i = 0; i < STAKING_CONTRACTS.length; i++) {

                        const stakingAddress = STAKING_CONTRACTS[i];

                            console.log(`\nProcessing staking ${i + 1}: ${stakingAddress}`);

                                const staking = await hre.ethers.getContractAt(
                                      "StakingERC20", // pastikan sesuai nama contract
                                            stakingAddress
                                                );

                                                    try {
                                                          // cek pending reward kalau ada
                                                                const pending = await staking.pendingReward(user.address);
                                                                      console.log(
                                                                              "Pending reward:",
                                                                                      hre.ethers.utils.formatEther(pending)
                                                                                            );

                                                                                                if (pending.eq(0)) {
                                                                                                          console.log("⏩ No reward, skip");
                                                                                                                  continue;
                                                                                                                        }

                                                                                                                            } catch {
                                                                                                                                  console.log("pendingReward() tidak tersedia, langsung claim...");
                                                                                                                                      }

                                                                                                                                          const tx = await staking.claim();
                                                                                                                                              console.log("Tx hash:", tx.hash);

                                                                                                                                                  await tx.wait();

                                                                                                                                                      console.log("✅ Claim success");
                                                                                                                                                        }

                                                                                                                                                          console.log("\n🚀 All claim processes completed!");
                                                                                                                                                          }

                                                                                                                                                          main().catch((error) => {
                                                                                                                                                            console.error(error);
                                                                                                                                                              process.exitCode = 1;
                                                                                                                                                              });
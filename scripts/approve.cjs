const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();
    console.log("Approving from:", user.address);

      // ====== GANTI INI ======
        const TOKEN_A = "0xc98FEa08624C89222B8bABda1a2CaAb635b05537";        // alamat token yang di-stake
          const STAKING_ADDRESS = "0x1eAD6388b852351d0f99fc725E37093E61705284"; // alamat contract staking
            const AMOUNT = "100000000";                      // jumlah token (tanpa desimal)
              // ========================

                // Ambil contract ERC20
                  const token = await hre.ethers.getContractAt(
                      "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
                        TOKEN_A
                        );

                    // Convert ke wei (ethers v5 pakai utils)
                      const amountInWei = hre.ethers.utils.parseUnits(AMOUNT, 18);

                        const tx = await token.approve(STAKING_ADDRESS, amountInWei);

                          console.log("Approve tx hash:", tx.hash);

                            await tx.wait();

                              console.log("Approve berhasil ✅");
                              }

                              main().catch((error) => {
                                console.error(error);
                                  process.exitCode = 1;
                                  });
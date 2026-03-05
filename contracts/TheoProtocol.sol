// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TheoProtocol {

        IERC20 public tokenA; // token yang dipinjam
            IERC20 public tokenB; // collateral

                mapping(address => uint256) public collateral;
                    mapping(address => uint256) public debt;

                        constructor(address _tokenA, address _tokenB) {
                                    tokenA = IERC20(_tokenA);
                                            tokenB = IERC20(_tokenB);
                        }

                            // deposit collateral TokenB
                                function depositCollateral(uint256 amount) external {

                                            require(amount > 0, "Amount must be > 0");

                                                    tokenB.transferFrom(msg.sender, address(this), amount);

                                                            collateral[msg.sender] += amount;
                                }

                                    // borrow TokenA
                                        function borrow(uint256 amount) external {

                                                    require(amount > 0, "Amount must be > 0");

                                                            // max borrow = 50% collateral
                                                                    require(collateral[msg.sender] / 2 >= debt[msg.sender] + amount, "Not enough collateral");

                                                                            debt[msg.sender] += amount;

                                                                                    tokenA.transfer(msg.sender, amount);
                                        }

                                            // repay TokenA
                                                function repay(uint256 amount) external {

                                                            require(amount > 0, "Amount must be > 0");

                                                                    tokenA.transferFrom(msg.sender, address(this), amount);

                                                                            debt[msg.sender] -= amount;
                                                }

                                                    // withdraw collateral
                                                        function withdrawCollateral(uint256 amount) external {

                                                                    require(debt[msg.sender] == 0, "Debt not repaid");

                                                                            collateral[msg.sender] -= amount;

                                                                                    tokenB.transfer(msg.sender, amount);
                                                        }
}
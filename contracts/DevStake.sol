// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
        function transferFrom(address from, address to, uint256 amount) external returns (bool);
            function transfer(address to, uint256 amount) external returns (bool);
                function balanceOf(address user) external view returns (uint256);
}

contract DevStake {

        IERC20 public immutable stakingToken; // Token A
            IERC20 public immutable rewardToken;  // Token B

                mapping(address => uint256) public staked;
                    mapping(address => uint256) public lastUpdate;

                            uint256 public constant REWARD_PER_SECOND_PER_1000 = 1e18;

                                constructor(address _stakingToken, address _rewardToken) {
                                            stakingToken = IERC20(_stakingToken);
                                                    rewardToken = IERC20(_rewardToken);
                                }

                                    function stake(uint256 amount) external {
                                                require(amount > 0, "Stake must be > 0");

                                                        _updateReward(msg.sender);

                                                                require(
                                                                                stakingToken.transferFrom(msg.sender, address(this), amount),
                                                                                            "transferFrom failed"
                                                                );

                                                                        staked[msg.sender] += amount;
                                                                                lastUpdate[msg.sender] = block.timestamp;
                                    }

                                        function unstake(uint256 amount) external {
                                                    require(staked[msg.sender] >= amount, "Not enough staked");

                                                            _updateReward(msg.sender);

                                                                    staked[msg.sender] -= amount;

                                                                            require(
                                                                                            stakingToken.transfer(msg.sender, amount),
                                                                                                        "unstake transfer failed"
                                                                            );
                                        }

                                            function claim() external {
                                                        _updateReward(msg.sender);
                                            }

                                                function pendingReward(address user) public view returns (uint256) {
                                                            if (staked[user] == 0) return 0;

                                                                    uint256 timePassed = block.timestamp - lastUpdate[user];

                                                                            uint256 rewardPerSecond =
                                                                                        (staked[user] * REWARD_PER_SECOND_PER_1000) /
                                                                                                    (1000 * 1e18);

                                                                                                            return rewardPerSecond * timePassed;
                                                }

                                                    function _updateReward(address user) internal {
                                                                uint256 reward = pendingReward(user);
                                                                        lastUpdate[user] = block.timestamp;

                                                                                if (reward > 0) {
                                                                                                require(
                                                                                                                    rewardToken.balanceOf(address(this)) >= reward,
                                                                                                                                    "Not enough reward pool"
                                                                                                );

                                                                                                            require(
                                                                                                                                rewardToken.transfer(user, reward),
                                                                                                                                                "reward transfer failed"
                                                                                                            );
                                                                                }
                                                    }
}

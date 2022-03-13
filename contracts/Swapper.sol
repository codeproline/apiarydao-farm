pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@pancakeswap/pancake-swap-lib/contracts/token/BEP20/IBEP20.sol";
import "@pancakeswap/pancake-swap-lib/contracts/token/BEP20/SafeBEP20.sol";
import "./HoneyCombToken.sol";

contract Swapper {
    using SafeMath for uint256;
    using SafeBEP20 for IBEP20;

    HoneyCombToken _hnyc;
    IBEP20 _hp;
    uint256 deploymentTime;

    receive() external payable {
        swap();
    }

    constructor(HoneyCombToken hnyc, IBEP20 hp) public {
        _hnyc = hnyc;
        _hp = hp;
        deploymentTime = now;
    }

    function swap() public {
        //get allowance of tokens for Swapper to user tokens
        require(now < deploymentTime + 14 days,"Swap period is over.");
        uint256 allowance = _hp.allowance(msg.sender,address(this));
        require(allowance > 0,"Need to let me transfer HP.");
        require(_hp.transferFrom(msg.sender,address(this),allowance),"Can't transfer HP to contract");
        _hnyc.mint(msg.sender,allowance.div(5)); //0.2 HNYC per HP


    }
}

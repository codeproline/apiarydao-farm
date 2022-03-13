import "@pancakeswap/pancake-swap-lib/contracts/token/BEP20/BEP20.sol";

contract DAOPoolShares is BEP20("DAOPool Shares","DAO") {
     function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
        
    }

    function burn(address _from ,uint256 _amount) public onlyOwner {
        _burn(_from, _amount);
    }
}
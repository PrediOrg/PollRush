use candid::{CandidType, Deserialize};
use ic_cdk::api::caller;
use std::collections::HashMap;
use std::cell::RefCell;

#[derive(CandidType, Deserialize, Clone)]
pub struct TokenInfo {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: u64,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct Account {
    pub balance: u64,
    pub allowances: HashMap<String, u64>,
}

// State
thread_local! {
    static TOKEN_INFO: RefCell<TokenInfo> = RefCell::new(TokenInfo {
        name: "Predi Poll Shares".to_string(),
        symbol: "PPs".to_string(),
        decimals: 8,
        total_supply: 0,
    });
    
    static ACCOUNTS: RefCell<HashMap<String, Account>> = RefCell::new(HashMap::new());
}

// Initialize the token
#[ic_cdk::init]
fn init() {
    TOKEN_INFO.with(|info| {
        let mut info = info.borrow_mut();
        info.total_supply = 10_000_000_000 * 10u64.pow(info.decimals as u32); // 10 billion tokens
    });
}

// Get token info
#[ic_cdk::query]
fn get_token_info() -> TokenInfo {
    TOKEN_INFO.with(|info| info.borrow().clone())
}

// Get balance
#[ic_cdk::query]
fn balance_of(account: String) -> u64 {
    ACCOUNTS.with(|accounts| {
        accounts.borrow()
            .get(&account)
            .map(|acc| acc.balance)
            .unwrap_or(0)
    })
}

// Mint tokens (only callable by the poll contract)
#[ic_cdk::update]
fn mint(to: String, amount: u64) -> Result<(), String> {
    // In production, add proper access control here
    ACCOUNTS.with(|accounts| {
        let mut accounts = accounts.borrow_mut();
        let account = accounts.entry(to).or_insert(Account {
            balance: 0,
            allowances: HashMap::new(),
        });
        account.balance += amount;
    });
    
    TOKEN_INFO.with(|info| {
        let mut info = info.borrow_mut();
        info.total_supply += amount;
    });
    
    Ok(())
}

// Transfer tokens
#[ic_cdk::update]
fn transfer(to: String, amount: u64) -> Result<(), String> {
    let from = caller().to_string();
    
    ACCOUNTS.with(|accounts| {
        let mut accounts = accounts.borrow_mut();
        let from_account = accounts.get_mut(&from)
            .ok_or("Sender account not found")?;
            
        if from_account.balance < amount {
            return Err("Insufficient balance".to_string());
        }
        
        from_account.balance -= amount;
        
        let to_account = accounts.entry(to).or_insert(Account {
            balance: 0,
            allowances: HashMap::new(),
        });
        to_account.balance += amount;
        
        Ok(())
    })
}

// Approve tokens
#[ic_cdk::update]
fn approve(spender: String, amount: u64) -> Result<(), String> {
    let owner = caller().to_string();
    
    ACCOUNTS.with(|accounts| {
        let mut accounts = accounts.borrow_mut();
        let account = accounts.entry(owner).or_insert(Account {
            balance: 0,
            allowances: HashMap::new(),
        });
        
        account.allowances.insert(spender, amount);
        Ok(())
    })
}

// Transfer from (for approved spending)
#[ic_cdk::update]
fn transfer_from(from: String, to: String, amount: u64) -> Result<(), String> {
    let spender = caller().to_string();
    
    ACCOUNTS.with(|accounts| {
        let mut accounts = accounts.borrow_mut();
        let from_account = accounts.get_mut(&from)
            .ok_or("From account not found")?;
            
        let allowance = from_account.allowances.get(&spender)
            .ok_or("No allowance found")?;
            
        if *allowance < amount {
            return Err("Insufficient allowance".to_string());
        }
        
        if from_account.balance < amount {
            return Err("Insufficient balance".to_string());
        }
        
        from_account.balance -= amount;
        from_account.allowances.insert(spender, allowance - amount);
        
        let to_account = accounts.entry(to).or_insert(Account {
            balance: 0,
            allowances: HashMap::new(),
        });
        to_account.balance += amount;
        
        Ok(())
    })
} 
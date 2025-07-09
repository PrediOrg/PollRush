use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::call::CallResult;
use ic_cdk::api::time;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, DefaultMemoryImpl, StableBTreeMap, Storable};
use serde::Serialize;
use std::cell::RefCell;
use std::borrow::Cow;

type Memory = VirtualMemory<DefaultMemoryImpl>;

#[derive(CandidType, Clone, Debug, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
struct PrincipalKey(Principal);

impl Default for PrincipalKey {
    fn default() -> Self {
        // Use the anonymous principal as default
        PrincipalKey(Principal::anonymous())
    }
}

impl Storable for PrincipalKey {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(bincode::serialize(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        bincode::deserialize(&bytes).unwrap()
    }
}

impl BoundedStorable for PrincipalKey {
    const MAX_SIZE: u32 = 29; // Principal is 29 bytes
    const IS_FIXED_SIZE: bool = true;
}

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );

    static BALANCES: RefCell<StableBTreeMap<PrincipalKey, Balance, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
        )
    );
}

#[derive(CandidType, Deserialize, Clone, Serialize)]
struct Balance {
    amount: u64,
    last_updated: u64,
}

impl Storable for Balance {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(bincode::serialize(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        bincode::deserialize(&bytes).unwrap()
    }
}

impl BoundedStorable for Balance {
    const MAX_SIZE: u32 = 1024; // 1KB
    const IS_FIXED_SIZE: bool = false;
}

#[derive(CandidType, Deserialize)]
struct TransferArgs {
    to: Principal,
    amount: u64,
}

#[ic_cdk::query]
fn balance_of(account: Principal) -> u64 {
    BALANCES.with(|balances| {
        balances.borrow()
            .get(&PrincipalKey(account))
            .map(|balance| balance.amount)
            .unwrap_or(0)
    })
}

#[ic_cdk::update]
fn transfer(args: TransferArgs) -> Result<(), String> {
    let caller = ic_cdk::caller();
    let amount = args.amount;
    
    BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        let from_balance = balances.get(&PrincipalKey(caller)).unwrap_or(Balance {
            amount: 0,
            last_updated: time(),
        });
        
        if from_balance.amount < amount {
            return Err("Insufficient balance".to_string());
        }
        
        let to_balance = balances.get(&PrincipalKey(args.to)).unwrap_or(Balance {
            amount: 0,
            last_updated: time(),
        });
        
        balances.insert(PrincipalKey(caller), Balance {
            amount: from_balance.amount - amount,
            last_updated: time(),
        });
        
        balances.insert(PrincipalKey(args.to), Balance {
            amount: to_balance.amount + amount,
            last_updated: time(),
        });
        
        Ok(())
    })
}

#[ic_cdk::update]
fn mint(account: Principal, amount: u64) -> Result<(), String> {
    let _caller = ic_cdk::caller();
    // TODO: Add authorization check
    
    BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        let current_balance = balances.get(&PrincipalKey(account)).unwrap_or(Balance {
            amount: 0,
            last_updated: time(),
        });
        
        balances.insert(PrincipalKey(account), Balance {
            amount: current_balance.amount + amount,
            last_updated: time(),
        });
        
        Ok(())
    })
} 
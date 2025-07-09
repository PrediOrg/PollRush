use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::call::CallResult;
use ic_cdk::api::time;
use ic_cdk::storage;
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Clone)]
struct Token {
    symbol: String,
    address: String,
    balance: u64,
}

#[derive(CandidType, Deserialize, Clone)]
struct Poll {
    id: u64,
    title: String,
    creator: Principal,
    token: String,
    reward_count: u32,
    reward_amount: u64,
    end_time: u64,
    options: Vec<String>,
    votes: Vec<u32>,
    status: String,
    created_at: u64,
}

thread_local! {
    static POLLS: RefCell<HashMap<u64, Poll>> = RefCell::new(HashMap::new());
    static NEXT_POLL_ID: RefCell<u64> = RefCell::new(1);
}

#[ic_cdk::query]
fn get_user_tokens(user: Principal) -> Vec<Token> {
    // TODO: Implement token balance checking for different token standards
    // For now, return an empty list
    vec![]
}

#[ic_cdk::update]
async fn create_poll(
    title: String,
    token: String,
    reward_count: u32,
    reward_amount: u64,
    end_time: u64,
    options: Vec<String>,
) -> Result<u64, String> {
    let caller = ic_cdk::caller();
    
    // Validate input
    if title.is_empty() {
        return Err("Title cannot be empty".to_string());
    }
    if reward_count == 0 {
        return Err("Reward count must be greater than 0".to_string());
    }
    if reward_amount == 0 {
        return Err("Reward amount must be greater than 0".to_string());
    }
    if end_time <= time() {
        return Err("End time must be in the future".to_string());
    }
    if options.len() < 2 || options.len() > 20 {
        return Err("Number of options must be between 2 and 20".to_string());
    }
    if options.iter().any(|opt| opt.is_empty()) {
        return Err("Options cannot be empty".to_string());
    }

    // Check token balance
    let total_reward = reward_count as u64 * reward_amount;
    let token_balance = check_token_balance(&token, caller).await?;
    if token_balance < total_reward {
        return Err(format!(
            "Insufficient token balance. Required: {}, Available: {}",
            total_reward, token_balance
        ));
    }

    // Create poll
    let poll_id = NEXT_POLL_ID.with(|id| {
        let current = *id.borrow();
        *id.borrow_mut() = current + 1;
        current
    });

    let poll = Poll {
        id: poll_id,
        title,
        creator: caller,
        token,
        reward_count,
        reward_amount,
        end_time,
        options,
        votes: vec![0; options.len()],
        status: "active".to_string(),
        created_at: time(),
    };

    POLLS.with(|polls| {
        polls.borrow_mut().insert(poll_id, poll);
    });

    // Transfer PPS tokens to creator
    transfer_pps_tokens(caller, 100_000_000).await?; // 100 PPS tokens (with 8 decimals)

    Ok(poll_id)
}

async fn check_token_balance(token_address: &str, user: Principal) -> Result<u64, String> {
    // TODO: Implement token balance checking for different token standards
    // For now, return a mock balance
    Ok(1_000_000_000) // 10 tokens with 8 decimals
}

async fn transfer_pps_tokens(to: Principal, amount: u64) -> Result<(), String> {
    // TODO: Implement PPS token transfer
    // For now, just return success
    Ok(())
}

// ... existing code ... 
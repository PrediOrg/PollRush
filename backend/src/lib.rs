use candid::{CandidType, Deserialize};
use ic_cdk::api::time;
use std::collections::HashMap;
use std::cell::RefCell;

// Types
#[derive(CandidType, Deserialize, Clone)]
pub struct RewardInfo {
    pub token_type: String,
    pub reward_amount: u64,
    pub reward_count: u32,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct Poll {
    pub id: u64,
    pub creator: String,
    pub title: String,
    pub options: Vec<String>,
    pub rewards: Option<RewardInfo>,
    pub deadline: u64,
    pub votes: Vec<u64>,
    pub voters: HashMap<String, usize>,
    pub created_at: u64,
}

// State
thread_local! {
    static POLLS: RefCell<Vec<Poll>> = RefCell::new(Vec::new());
    static NEXT_POLL_ID: RefCell<u64> = RefCell::new(1);
}

// Create a new poll
#[ic_cdk::update]
fn create_poll(
    title: String,
    options: Vec<String>,
    rewards: Option<RewardInfo>,
    deadline: u64,
) -> u64 {
    let caller = ic_cdk::caller().to_string();
    
    let poll_id = NEXT_POLL_ID.with(|id| {
        let current = *id.borrow();
        *id.borrow_mut() = current + 1;
        current
    });

    let poll = Poll {
        id: poll_id,
        creator: caller.clone(),
        title,
        options: options.clone(),
        rewards,
        deadline,
        votes: vec![0; options.len()],
        voters: HashMap::new(),
        created_at: time(),
    };

    POLLS.with(|polls| {
        polls.borrow_mut().push(poll);
    });

    // Airdrop 100 PPs to creator
    airdrop_pps(caller, 100);

    poll_id
}

// Vote on a poll
#[ic_cdk::update]
fn vote(poll_id: u64, option_id: usize) -> Result<(), String> {
    let caller = ic_cdk::caller().to_string();
    
    POLLS.with(|polls| {
        let mut polls = polls.borrow_mut();
        let poll = polls.iter_mut().find(|p| p.id == poll_id)
            .ok_or("Poll not found")?;
        
        if time() > poll.deadline {
            return Err("Poll has ended".to_string());
        }
        
        if poll.voters.contains_key(&caller) {
            return Err("Already voted".to_string());
        }
        
        if option_id >= poll.options.len() {
            return Err("Invalid option".to_string());
        }
        
        poll.votes[option_id] += 1;
        poll.voters.insert(caller.clone(), option_id);
        
        // Airdrop 10 PPs to voter
        airdrop_pps(caller, 10);
        
        Ok(())
    })
}

// Get all polls
#[ic_cdk::query]
fn get_polls(sort_by: String) -> Vec<Poll> {
    POLLS.with(|polls| {
        let mut polls = polls.borrow().clone();
        match sort_by.as_str() {
            "time" => polls.sort_by(|a, b| b.created_at.cmp(&a.created_at)),
            "popularity" => polls.sort_by(|a, b| {
                let a_total: u64 = a.votes.iter().sum();
                let b_total: u64 = b.votes.iter().sum();
                b_total.cmp(&a_total)
            }),
            _ => {}
        }
        polls
    })
}

// Get a specific poll
#[ic_cdk::query]
fn get_poll(poll_id: u64) -> Option<Poll> {
    POLLS.with(|polls| {
        polls.borrow().iter().find(|p| p.id == poll_id).cloned()
    })
}

// Get polls created by a user
#[ic_cdk::query]
fn get_my_polls(user: String) -> Vec<Poll> {
    POLLS.with(|polls| {
        polls.borrow()
            .iter()
            .filter(|p| p.creator == user)
            .cloned()
            .collect()
    })
}

// Get polls voted by a user
#[ic_cdk::query]
fn get_my_attendance(user: String) -> Vec<Poll> {
    POLLS.with(|polls| {
        polls.borrow()
            .iter()
            .filter(|p| p.voters.contains_key(&user))
            .cloned()
            .collect()
    })
}

// Airdrop PPs tokens
fn airdrop_pps(_user: String, _amount: u64) {
    // This would call the PPs token canister to mint tokens
    // Implementation depends on the PPs token contract
}

// Initialize the canister
#[ic_cdk::init]
fn init() {
    NEXT_POLL_ID.with(|id| {
        *id.borrow_mut() = 1;
    });
} 
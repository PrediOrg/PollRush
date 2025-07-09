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

    static POLLS: RefCell<StableBTreeMap<u64, Poll, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
        )
    );

    static VOTES: RefCell<StableBTreeMap<(u64, PrincipalKey), Vote, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
        )
    );
}

#[derive(CandidType, Deserialize, Clone, Serialize)]
struct Poll {
    id: u64,
    title: String,
    description: String,
    options: Vec<String>,
    creator: Principal,
    created_at: u64,
    deadline: Option<u64>,
    is_active: bool,
}

impl Storable for Poll {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(bincode::serialize(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        bincode::deserialize(&bytes).unwrap()
    }
}

impl BoundedStorable for Poll {
    const MAX_SIZE: u32 = 1024 * 1024; // 1MB
    const IS_FIXED_SIZE: bool = false;
}

#[derive(CandidType, Deserialize, Serialize)]
struct Vote {
    poll_id: u64,
    voter: Principal,
    option_index: u32,
    voted_at: u64,
}

impl Storable for Vote {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(bincode::serialize(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        bincode::deserialize(&bytes).unwrap()
    }
}

impl BoundedStorable for Vote {
    const MAX_SIZE: u32 = 1024; // 1KB
    const IS_FIXED_SIZE: bool = false;
}

#[derive(CandidType, Deserialize)]
struct CreatePollArgs {
    title: String,
    description: String,
    options: Vec<String>,
    deadline: Option<u64>,
}

#[derive(CandidType, Deserialize)]
struct VoteArgs {
    poll_id: u64,
    option_index: u32,
}

#[ic_cdk::query]
fn get_poll(id: u64) -> Option<Poll> {
    POLLS.with(|polls| polls.borrow().get(&id))
}

#[ic_cdk::query]
fn get_polls() -> Vec<Poll> {
    POLLS.with(|polls| polls.borrow().iter().map(|(_, poll)| poll).collect())
}

#[ic_cdk::update]
fn create_poll(args: CreatePollArgs) -> Result<u64, String> {
    let caller = ic_cdk::caller();
    let id = POLLS.with(|polls| polls.borrow().len() as u64);
    
    let poll = Poll {
        id,
        title: args.title,
        description: args.description,
        options: args.options,
        creator: caller,
        created_at: time(),
        deadline: args.deadline,
        is_active: true,
    };

    POLLS.with(|polls| {
        polls.borrow_mut().insert(id, poll);
    });

    Ok(id)
}

#[ic_cdk::update]
fn vote(args: VoteArgs) -> Result<(), String> {
    let caller = ic_cdk::caller();
    
    POLLS.with(|polls| {
        let poll = polls.borrow().get(&args.poll_id)
            .ok_or("Poll not found")?;
            
        if !poll.is_active {
            return Err("Poll is not active".to_string());
        }
        
        if let Some(deadline) = poll.deadline {
            if time() > deadline {
                return Err("Poll deadline has passed".to_string());
            }
        }
        
        if args.option_index as usize >= poll.options.len() {
            return Err("Invalid option index".to_string());
        }
        
        Ok(())
    })?;

    let vote = Vote {
        poll_id: args.poll_id,
        voter: caller,
        option_index: args.option_index,
        voted_at: time(),
    };

    VOTES.with(|votes| {
        votes.borrow_mut().insert((args.poll_id, PrincipalKey(caller)), vote);
    });

    Ok(())
}

#[ic_cdk::query]
fn get_votes(poll_id: u64) -> Vec<Vote> {
    VOTES.with(|votes| {
        votes.borrow()
            .iter()
            .filter(|((id, _), _)| *id == poll_id)
            .map(|(_, vote)| vote)
            .collect()
    })
}

// Export Candid interface
ic_cdk::export_candid!(); 
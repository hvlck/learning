use std::env;
use std::process;

use pygmy::Timer;

fn main() {
    let timer = Timer::new(env::args()).unwrap_or_else(|err| {
        eprintln!("Failed to parse arguments: {}", err);
        process::exit(1);
    });
    
}

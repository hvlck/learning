use std::time::Duration;
use std::thread::sleep;

#[derive(Debug)]
pub struct Timer {
	pub duration_string: String,
	pub duration: u64,
	pub name: String,
	pub started: bool
}

impl Timer {
	pub fn new(mut args: std::env::Args) -> Result<Timer, &'static str> {
		args.next();

		let time = match args.next() {
			Some(val) => val,
			None => return Err("No time specified.")
		};

		let index = match time.find(':') {
			Some(val) => val,
			None => 0
		};

		let name = match args.next() {
			Some(val) => val,
			None => String::from("Default Timer (") + &time[..] + ")"
		};

		if index == 0 {
			Ok(Timer {
				duration: time.clone().parse::<u64>().unwrap(),
				duration_string: time,
				name: name,
				started: false
			})
		} else {
			Ok(Timer {
				duration: (time.clone()[..index].parse::<u64>().unwrap() * 60) + time.clone()[index + 1..].parse::<u64>().unwrap(),
				duration_string: time,
				name: name,
				started: false
			})
		}
	}

	pub fn start(&self) {
		let sleep_time = self.duration / 10;
		
		let mut index = 1;

		println!("Starting timer: {} | (Duration: {}s)", self.name, self.duration);
		
		while index < 10 {
			sleep(Duration::new(sleep_time, 0));
			println!("{}: {}% ({}s / {}s)", self.name, index * 10, sleep_time * index, self.duration);
			index += 1;
		}

		println!("{}: {}% ({}s / {}s)", self.name, index * 10, sleep_time * index, self.duration);
		println!("Completed timer: {} ({}s).", self.name, self.duration);
	}
}
